import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { db } from "@/lib/db";

const volunteerSchema = z.object({
  name: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
  phone: z.string().trim().min(6, "সঠিক মোবাইল নম্বর দিন"),
  email: z
    .union([z.string().trim().email("সঠিক ইমেইল দিন"), z.literal("")])
    .optional()
    .transform((v) => (v ? v : undefined)),
  address: z.string().trim().optional().transform((v) => (v ? v : undefined)),
  message: z.string().trim().optional().transform((v) => (v ? v : undefined)),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = volunteerSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "তথ্য সঠিক নয়";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const volunteer = await db.volunteer.create({ data: parsed.data });

    return NextResponse.json(
      { success: true, id: volunteer.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Volunteer registration failed:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
