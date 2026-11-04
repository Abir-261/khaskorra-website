"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, HeartHandshake, Facebook, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { BreakingNews } from "./breaking-news";

const NAV_LINKS = [
  { href: "#home", label: "হোম" },
  { href: "#about", label: "আমাদের সম্পর্কে" },
  { href: "#programs", label: "কার্যক্রম" },
  { href: "#gallery", label: "গ্যালারি" },
  { href: "#transparency", label: "দান-খরচের হিসাব" },
  { href: "#volunteer", label: "সেচ্ছাসেবী" },
  { href: "#contact", label: "যোগাযোগ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-md backdrop-blur"
          : "bg-white/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2.5" aria-label="খাসকররা ফাউন্ডেশন হোম">
            <Image
              src="/images/logo.png"
              alt="খাসকররা ফাউন্ডেশনের লোগো"
              width={44}
              height={44}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover ring-2 ring-primary/20"
              priority
            />
            <div className="leading-tight">
              <span className="block text-lg md:text-xl font-bold text-primary">
                খাসকররা ফাউন্ডেশন
              </span>
              <span className="block text-[11px] md:text-xs text-muted-foreground">
                মানবতার কাজে আমরা সবাই
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="প্রধান মেনু">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-[15px] font-medium text-foreground/80 hover:text-primary hover:bg-secondary rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="আমাদের ফেসবুক পেজ ভিজিট করুন"
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-full text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
            >
              <Facebook className="w-5 h-5" aria-hidden />
            </a>
            <Button asChild className="hidden sm:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-sm">
              <Link href="#donate">
                <HeartHandshake className="w-4 h-4 mr-1.5" />
                অনুদান করুন
              </Link>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="মেনু খুলুন">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 text-primary">
                    <Image
                      src="/images/logo.png"
                      alt="খাসকররা ফাউন্ডেশনের লোগো"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                    খাসকররা ফাউন্ডেশন
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    মেনু — বিভিন্ন সেকশনে যেতে লিংকে ক্লিক করুন
                  </SheetDescription>
                </SheetHeader>
                <nav className="flex flex-col gap-1 mt-2 px-4" aria-label="মোবাইল মেনু">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-3 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Button asChild className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    <Link href="#donate" onClick={() => setOpen(false)}>
                      <HeartHandshake className="w-4 h-4 mr-1.5" />
                      অনুদান করুন
                    </Link>
                  </Button>
                  <a
                    href={SITE.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center gap-2.5 px-3 py-3 rounded-md text-base font-medium text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Facebook className="w-5 h-5" aria-hidden />
                    আমাদের ফেসবুক পেজ
                  </a>
                  <a
                    href={SITE.facebookGroup}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-3 py-3 rounded-md text-base font-medium text-[#1877F2] hover:bg-[#1877F2]/10 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Users className="w-5 h-5" aria-hidden />
                    আমাদের ফেসবুক গ্রুপ
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* ব্রেকিং নিউজ টিকার */}
      <BreakingNews />
    </header>
  );
}
