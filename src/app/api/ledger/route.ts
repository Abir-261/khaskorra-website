import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// বিল্ডের সময় ডেটাবেস কল যেন না হয় — প্রতি রিকোয়েস্টে সরাসরি চলুক
export const dynamic = "force-dynamic";

// দান-খরচের সারসংক্ষেপ — সবাই দেখতে পারবে (স্বচ্ছতা)
export async function GET() {
  try {
    const [donationAgg, expenseAgg, donations, expenses, allExpenses] =
      await Promise.all([
        db.donation.aggregate({ _sum: { amount: true }, _count: true }),
        db.expense.aggregate({ _sum: { amount: true }, _count: true }),
        db.donation.findMany({
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true,
            name: true,
            amount: true,
            category: true,
            message: true,
            isPublic: true,
            createdAt: true,
          },
        }),
        db.expense.findMany({
          orderBy: { spentAt: "desc" },
          take: 20,
        }),
        db.expense.findMany({
          select: { category: true, amount: true },
        }),
      ]);

    // খাত অনুযায়ী খরচের হিসাব
    const byCategoryMap = new Map<string, { amount: number; count: number }>();
    for (const e of allExpenses) {
      const prev = byCategoryMap.get(e.category) ?? { amount: 0, count: 0 };
      byCategoryMap.set(e.category, {
        amount: prev.amount + e.amount,
        count: prev.count + 1,
      });
    }
    const byCategory = Array.from(byCategoryMap.entries())
      .map(([category, v]) => ({ category, ...v }))
      .sort((a, b) => b.amount - a.amount);

    const totalDonations = donationAgg._sum.amount ?? 0;
    const totalExpenses = expenseAgg._sum.amount ?? 0;

    return NextResponse.json({
      totals: {
        donations: totalDonations,
        expenses: totalExpenses,
        balance: totalDonations - totalExpenses,
        donationCount: donationAgg._count,
        expenseCount: expenseAgg._count,
      },
      byCategory,
      donations: donations.map((d) => ({
        ...d,
        name: d.isPublic ? d.name : "একজন দানকারী",
      })),
      expenses,
    });
  } catch (error) {
    console.error("Ledger fetch failed:", error);
    return NextResponse.json(
      { error: "হিসাব লোড করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
