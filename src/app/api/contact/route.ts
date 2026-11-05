import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { z } from "zod";
import { db } from "@/lib/db";

const contactSchema = z.object({
  name: z.string().trim().min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে"),
  phone: z.string().trim().optional().transform((v) => (v ? v : undefined)),
  message: z.string().trim().min(5, "বার্তা কমপক্ষে ৫ অক্ষরের হতে হবে"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? "তথ্য সঠিক নয়";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const message = await db.contactMessage.create({ data: parsed.data });

    return NextResponse.json(
      { success: true, id: message.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact message failed:", error);
    return NextResponse.json(
      { error: "সার্ভারে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
