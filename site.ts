// সাইটের শেয়ার্ড কনফিগ — আসল তথ্য
export const SITE = {
  name: "খাসকররা ফাউন্ডেশন",
  tagline: "মানবতার কল্যাণে আমরা কাজ করি",
  // ফেসবুক পেজ ও গ্রুপ
  facebook: "https://www.facebook.com/profile.php?id=61574118900729",
  facebookGroup: "https://www.facebook.com/share/g/14tQszfKQcF/",
  // ফোন / WhatsApp / বিকাশ — একই নম্বর
  phone: "০১৯৫৯০৩৯৬১১",
  phoneRaw: "01959039611",
  bkash: "০১৯৫৯০৩৯৬১১",
  whatsapp: "০১৯৫৯০৩৯৬১১",
  // TODO: ইমেইল থাকলে পরিবর্তন করুন
  email: "info@khaskorrafoundation.org",
} as const;

// দান/খরচের খাতসমূহ
export const CATEGORIES = [
  "খাদ্য সহায়তা",
  "শীতবস্ত্র",
  "শিক্ষা সহায়তা",
  "চিকিৎসা সহায়তা",
  "দুর্যোগ ত্রাণ",
  "অসহায়দের পাশে",
  "সাধারণ তহবিল",
] as const;

export type Category = (typeof CATEGORIES)[number];
