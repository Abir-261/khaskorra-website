"use client";

import Image from "next/image";
import Link from "next/link";
import { HeartHandshake, HandHeart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "./fade-in";

export function Hero() {
  return (
    <section id="home" className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden">
      {/* decorative blobs */}
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary blur-3xl opacity-70 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-0 -left-32 w-80 h-80 rounded-full bg-accent/40 blur-3xl opacity-60 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">
          {/* Text */}
          <FadeIn>
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
                <HandHeart className="w-4 h-4 text-primary" />
                একটি অরাজনৈতিক, অলাভজনক মানবিক সংগঠন
              </span>
              <h1 className="text-4xl md:text-5xl xl:text-[3.4rem] font-bold leading-[1.25] text-foreground">
                দরিদ্র ও অসহায় মানুষের{" "}
                <span className="text-primary">পাশে আমরা,</span>{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">পাশে আপনিও</span>
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-1 h-3 bg-accent/70 rounded-sm -rotate-1"
                  />
                </span>{" "}
                আসুন
              </h1>
              <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                খাসকররা ফাউন্ডেশন খাদ্য, শিক্ষা, চিকিৎসা ও শীতবস্ত্র সহায়তার
                মাধ্যমে দুঃখী-দরিদ্র মানুষের জীবনে আলো আনতে কাজ করে। আপনার ছোট্ট
                সহযোগিতা হতে পারে কারো বড় ভরসা।
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
                <Button asChild size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base shadow-md">
                  <Link href="#donate">
                    <HandHeart className="w-5 h-5 mr-2" />
                    অনুদান করুন
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-semibold text-base border-primary/40 text-primary hover:bg-secondary">
                  <Link href="#volunteer">
                    <Users className="w-5 h-5 mr-2" />
                    সেচ্ছাসেবী হোন
                  </Link>
                </Button>
              </div>

              {/* mini trust row */}
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 text-sm text-muted-foreground">
                <span className="flex -space-x-2">
                  {["/images/food.png", "/images/education.png", "/images/medical.png"].map(
                    (src, i) => (
                      <Image
                        key={i}
                        src={src}
                        alt={`কার্যক্রম ${i + 1}`}
                        width={36}
                        height={36}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
                      />
                    )
                  )}
                </span>
                <span>
                  <strong className="text-foreground font-semibold">শত শত পরিবার</strong>{" "}
                  ইতিমধ্যেই আমাদের সহায়তা পেয়েছে
                </span>
              </div>
            </div>
          </FadeIn>

          {/* Image */}
          <FadeIn delay={0.15}>
            <div className="relative max-w-xl mx-auto lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <Image
                  src="/images/hero.png"
                  alt="খাসকররা ফাউন্ডেশনের সেচ্ছাসেবকরা গ্রামের দরিদ্র মানুষের মাঝে খাদ্য বিতরণ করছেন"
                  width={1344}
                  height={768}
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              </div>

              {/* floating card 1 */}
              <div className="absolute -bottom-6 left-4 md:left-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 ring-1 ring-black/5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                  <HeartHandshake className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-bold text-foreground">৫০০+ পরিবার</p>
                  <p className="text-xs text-muted-foreground">সহায়তা পেয়েছে</p>
                </div>
              </div>

              {/* floating card 2 */}
              <div className="absolute -top-5 right-4 md:right-8 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-3 ring-1 ring-black/5">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/25 text-accent-foreground">
                  <Users className="w-5 h-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-bold text-foreground">৮০+ সেচ্ছাসেবক</p>
                  <p className="text-xs text-muted-foreground">নিয়মিত কাজ করছেন</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
