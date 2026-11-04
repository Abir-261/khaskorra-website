import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { db } from "@/lib/db";
import { isAuthorized } from "@/lib/admin";

// ব্রেকিং নিউজ টিকারের আইটেম — ঘোষণা + সাম্প্রতিক দান (পাবলিক)
// ?admin=1 + পাসকোড দিলে এডমিনের জন্য আইডিসহ কাঁচা তালিকা ফেরত দেয়
export async function GET(request: NextRequest) {
  try {
    const adminMode = request.nextUrl.searchParams.get("admin") === "1";

    if (adminMode) {
      if (!isAuthorized(request)) {
        return NextResponse.json({ error: "ভুল পাসকোড!" }, { status: 401 });
      }
      const all = await db.announcement.findMany({
        orderBy: { createdAt: "desc" },
        take: 30,
      });
      return NextResponse.json({ adminItems: all });
    }

    const [announcements, recentDonations] = await Promise.all([
      db.announcement.findMany({
        where: { active: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),
      db.donation.findMany({
        where: { isPublic: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      }),
    ]);

    const items: string[] = [
      ...announcements.map((a) => a.text),
      ...recentDonations.map(
        (d) => `${d.name} দান করেছেন ৳${d.amount.toLocaleString("en-IN")} — ${d.category} খাতে। জাযাকাল্লাহু খাইরান!`
      ),
    ];

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Announcement fetch failed:", error);
    return NextResponse.json({ items: [] });
  }
}

// ঘোষণা যোগ করা — শুধু এডমিন
const announcementSchema = z.object({
  text: z.string().trim().min(4, "ঘোষণার লেখা কমপক্ষে ৪ অক্ষরের হতে হবে"),
});

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "ভুল পাসকোড!" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = announcementSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "তথ্য সঠিক নয়";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    await db.announcement.create({ data: { text: parsed.data.text } });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Announcement create failed:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}

// ঘোষণা মুছে ফেলা — শুধু এডমিন
export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "ভুল পাসকোড!" }, { status: 401 });
  }

  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "id প্রয়োজন" }, { status: 400 });
    }
    await db.announcement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "ঘোষণাটি খুঁজে পাওয়া যায়নি।" },
      { status: 400 }
    );
  }
}
