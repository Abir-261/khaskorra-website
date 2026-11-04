import type { NextRequest } from "next/server";

// এডমিন পাসকোড যাচাই (.env ফাইলে ADMIN_PASSCODE পরিবর্তন করা যায়)
export function isAuthorized(req: NextRequest): boolean {
  const code = req.headers.get("x-admin-passcode");
  const expected = process.env.ADMIN_PASSCODE || "khaskorra2026";
  return Boolean(code) && code === expected;
}
