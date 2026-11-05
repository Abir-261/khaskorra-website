import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { db } from "@/lib/db";

// দান রেকর্ড করার ফর্ম — যে কেউ নিজের দানের তথ্য জমা দিতে পারবে
const donationSchema = z.object({
  name: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
  phone: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v ? v : undefined)),
  amount: z.coerce
    .number()
    .int("পূর্ণসংখ্যায় টাকার পরিমাণ লিখুন")
    .min(1, "টাকার পরিমাণ কমপক্ষে ১ টাকা হতে হবে")
    .max(100000000, "অস্বাভাবিক বড় পরিমাণ — সরাসরি যোগাযোগ করুন"),
  category: z.string().trim().min(2, "খাত নির্বাচন করুন"),
  message: z.string().trim().optional().transform((v) => (v ? v : undefined)),
  isPublic: z.boolean().optional().default(true),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = donationSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "তথ্য সঠিক নয়";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const donation = await db.donation.create({ data: parsed.data });

    return NextResponse.json(
      { success: true, id: donation.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Donation record failed:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
