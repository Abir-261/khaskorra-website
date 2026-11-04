import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bengali",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "খাসকররা ফাউন্ডেশন | মানবতার কল্যাণে আমরা কাজ করি",
  description:
    "খাসকররা ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক স্বেচ্ছাসেবী মানবিক সংগঠন। দরিদ্র ও অসহায় মানুষের পাশে আছি খাদ্য, শিক্ষা, চিকিৎসা ও শীতবস্ত্র সহায়তায়।",
  keywords: [
    "খাসকররা ফাউন্ডেশন",
    "মানবিক সংগঠন",
    "charity",
    "foundation",
    "সেচ্ছাসেবী",
    "অনুদান",
  ],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "খাসকররা ফাউন্ডেশন",
    description: "দরিদ্র ও অসহায় মানুষের পাশে আমরা — মানবতার কল্যাণে কাজ করি।",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${hindSiliguri.variable} antialiased bg-background text-foreground font-bengali`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
