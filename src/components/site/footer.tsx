"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Heart, Facebook, Users } from "lucide-react";
import { SITE } from "@/lib/site";

const QUICK_LINKS = [
  { href: "#home", label: "হোম" },
  { href: "#about", label: "আমাদের সম্পর্কে" },
  { href: "#programs", label: "কার্যক্রম" },
  { href: "#gallery", label: "গ্যালারি" },
  { href: "#donate", label: "অনুদান করুন" },
  { href: "#transparency", label: "দান-খরচের হিসাব" },
  { href: "#volunteer", label: "সেচ্ছাসেবী হোন" },
];

const PROGRAM_LINKS = [
  "খাদ্য সহায়তা",
  "শীতবস্ত্র বিতরণ",
  "শিক্ষা সহায়তা",
  "চিকিৎসা সহায়তা",
  "দুর্যোগে ত্রাণ",
];

export function Footer() {
  return (
    <footer className="mt-auto bg-foreground text-primary-foreground/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <Image
                src="/images/logo.png"
                alt="খাসকররা ফাউন্ডেশনের লোগো"
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover ring-2 ring-white/20"
              />
              <span className="text-lg font-bold text-white">
                খাসকররা ফাউন্ডেশন
              </span>
            </div>
            <p className="text-sm leading-relaxed text-primary-foreground/75">
              একটি অরাজনৈতিক, অলাভজনক স্বেচ্ছাসেবী মানবিক সংগঠন — দরিদ্র ও
              অসহায় মানুষের পাশে আমরা, মানবতার কল্যাণে কাজ করি।
            </p>

            {/* সোশ্যাল লিংক — পেজ ও গ্রুপ */}
            <div className="mt-5 flex items-center gap-2.5">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="আমাদের ফেসবুক পেজ"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white transition-colors"
              >
                <Facebook className="w-5 h-5" aria-hidden />
              </a>
              <a
                href={SITE.facebookGroup}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="আমাদের ফেসবুক গ্রুপ"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-[#1877F2] text-white transition-colors"
              >
                <Users className="w-5 h-5" aria-hidden />
              </a>
              <span className="text-sm text-primary-foreground/75">
                ফেসবুক পেজ ও গ্রুপে আমাদের ফলো করুন
              </span>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="দ্রুত লিংক">
            <h3 className="text-white font-semibold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/75 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">আমাদের কার্যক্রম</h3>
            <ul className="space-y-2.5">
              {PROGRAM_LINKS.map((item) => (
                <li key={item} className="text-sm text-primary-foreground/75">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-3 text-sm text-primary-foreground/75">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <a
                  href={`tel:+88${SITE.phoneRaw}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                <span>খাসকররা ফাউন্ডেশন অফিস, খাসকররা</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-primary-foreground/70">
            © ২০২৬ খাসকররা ফাউন্ডেশন — সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
              মানবতার কল্যাণে তৈরি
              <Heart className="w-4 h-4 text-accent fill-accent" aria-hidden />
            </p>
            <Link
              href="/admin"
              className="text-xs text-primary-foreground/40 hover:text-primary-foreground/80 transition-colors"
            >
              এডমিন
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
