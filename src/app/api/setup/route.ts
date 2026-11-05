import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
import { isAuthorized } from "@/lib/admin";
import { libsqlClient } from "@/lib/db";

// Turso/নতুন ডেটাবেসে প্রথমবার টেবিল তৈরি করার রুট।
// ব্যবহার: ব্রাউজারে https://আপনার-সাইট/api/setup?key=এডমিন-পাসকোড খুলুন (একবারই যথেষ্ট)।
// বারবার চালানো নিরাপদ — বিদ্যমান টেবিল বা ডেটা কিছুই মুছে না (IF NOT EXISTS)।

const TABLE_SQL: string[] = [
  // সেচ্ছাসেবী
  `CREATE TABLE IF NOT EXISTS "Volunteer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "message" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  // যোগাযোগ বার্তা
  `CREATE TABLE IF NOT EXISTS "ContactMessage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "message" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  // দান / অনুদান রেকর্ড
  `CREATE TABLE IF NOT EXISTS "Donation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "amount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "message" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  // খরচের হিসাব
  `CREATE TABLE IF NOT EXISTS "Expense" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "note" TEXT,
    "spentAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
  // ব্রেকিং নিউজ ঘোষণা
  `CREATE TABLE IF NOT EXISTS "Announcement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  )`,
];

async function runSetup(request: NextRequest) {
  // পাসকোড যাচাই: ?key=... (GET) অথবা x-admin-passcode হেডার (POST)
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const authorized =
    isAuthorized(request) ||
    (Boolean(key) && key === (process.env.ADMIN_PASSCODE || "khaskorra2026"));

  if (!authorized) {
    return NextResponse.json(
      { error: "ভুল পাসকোড। URL-এর শেষে ?key=আপনার-এডমিন-পাসকোড দিন।" },
      { status: 401 }
    );
  }

  try {
    for (const sql of TABLE_SQL) {
      await libsqlClient.execute(sql);
    }

    // টেবিলগুলো সত্যিই তৈরি হয়েছে কিনা যাচাই
    const result = await libsqlClient.execute(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('Volunteer','ContactMessage','Donation','Expense','Announcement')"
    );
    const tables = result.rows.map((row) => String(row.name)).sort();

    return NextResponse.json({
      success: true,
      message: "ডেটাবেস প্রস্তুত! সব টেবিল তৈরি হয়ে গেছে। ✅",
      tables,
    });
  } catch (error) {
    console.error("Database setup failed:", error);
    return NextResponse.json(
      { error: "ডেটাবেস সেটআপে সমস্যা হয়েছে। লগ দেখুন বা আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return runSetup(request);
}

export async function POST(request: NextRequest) {
  return runSetup(request);
}
