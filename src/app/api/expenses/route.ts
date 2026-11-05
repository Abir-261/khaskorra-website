import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { db } from "@/lib/db";
import { isAuthorized } from "@/lib/admin";

// খরচ যোগ করা — শুধু এডমিন (পাসকোডসহ)
const expenseSchema = z.object({
  title: z.string().trim().min(3, "খরচের বিবরণ কমপক্ষে ৩ অক্ষরের হতে হবে"),
  category: z.string().trim().min(2, "খাত নির্বাচন করুন"),
  amount: z.coerce
    .number()
    .int("পূর্ণসংখ্যায় টাকার পরিমাণ লিখুন")
    .min(1, "টাকার পরিমাণ কমপক্ষে ১ টাকা হতে হবে"),
  note: z.string().trim().optional().transform((v) => (v ? v : undefined)),
  spentAt: z
    .string()
    .optional()
    .transform((v) => (v ? new Date(v) : undefined)),
});

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "ভুল পাসকোড! শুধুমাত্র এডমিন খরচ যোগ করতে পারবেন।" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const parsed = expenseSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "তথ্য সঠিক নয়";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const expense = await db.expense.create({
      data: {
        title: parsed.data.title,
        category: parsed.data.category,
        amount: parsed.data.amount,
        note: parsed.data.note,
        ...(parsed.data.spentAt ? { spentAt: parsed.data.spentAt } : {}),
      },
    });

    return NextResponse.json(
      { success: true, id: expense.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Expense create failed:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}

// খরচ মুছে ফেলা — শুধু এডমিন
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "ভুল পাসকোড!" },
      { status: 401 }
    );
  }

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id প্রয়োজন" }, { status: 400 });
    }
    await db.expense.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "খরচটি খুঁজে পাওয়া যায়নি বা মুছতে সমস্যা হয়েছে।" },
      { status: 400 }
    );
  }
}
