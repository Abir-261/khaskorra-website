// বাংলা সংখ্যা ও তারিখ ফরম্যাট হেল্পার
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const BN_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

/** ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর: 1250 → ১২৫০ */
export function toBn(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** টাকার পরিমাণ বাংলায় (হাজার/লাখ ফরম্যাটসহ): 1250 → ৳ ১,২৫০ */
export function formatTaka(amount: number): string {
  return `৳ ${toBn(amount.toLocaleString("en-IN"))}`;
}

/** তারিখ বাংলায়: 2026-11-04 → ৪ নভেম্বর, ২০২৬ */
export function formatDateBn(date: Date | string): string {
  const d = new Date(date);
  return `${toBn(d.getDate())} ${BN_MONTHS[d.getMonth()]}, ${toBn(d.getFullYear())}`;
}
