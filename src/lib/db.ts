import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import { mkdirSync } from 'fs'
import { dirname, resolve } from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// ডেটাবেস কানেকশন:
// - লোকাল ডেভেলপমেন্টে: DATABASE_URL=file:./db/custom.db (ফাইল ডেটাবেস)
// - প্রোডাকশনে (Vercel + Turso): DATABASE_URL=libsql://... এবং DATABASE_AUTH_TOKEN=...
// - Vercel Marketplace থেকে Turso যোগ করলে TURSO_DATABASE_URL / TURSO_AUTH_TOKEN-ও কাজ করে
const rawUrl =
  process.env.DATABASE_URL ??
  process.env.TURSO_DATABASE_URL ??
  'file:./db/custom.db'

const authToken =
  process.env.DATABASE_AUTH_TOKEN ?? process.env.TURSO_AUTH_TOKEN

const isRemote =
  rawUrl.startsWith('libsql://') || rawUrl.startsWith('https://')

// Turso/লোকাল — দুই ধরনের URL-ই @libsql/client দিয়ে চলে
const connectionConfig = {
  url: rawUrl,
  authToken: isRemote ? authToken : undefined,
}

// লোকাল ফাইল ডেটাবেস হলে ফোল্ডারটা না থাকলে আগে বানিয়ে নেই
// (Vercel-এর বিল্ড মেশিনে db/ ফোল্ডার না থাকায় ক্র্যাশ এড়াতে)
if (!isRemote && rawUrl.startsWith('file:')) {
  try {
    mkdirSync(dirname(resolve(rawUrl.slice('file:'.length))), { recursive: true })
  } catch {}
}

// /api/setup রুট টেবিল তৈরির জন্য এই client ব্যবহার করে
export const libsqlClient = createClient(connectionConfig)

// Prisma অ্যাডাপ্টার — কনফিগ দিলে নিজেই কানেকশন তৈরি করে
const adapter = new PrismaLibSQL(connectionConfig)

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
