"use client";

import { HandHeart, GraduationCap, Stethoscope, Users } from "lucide-react";
import { FadeIn } from "./fade-in";

const STATS = [
  { icon: HandHeart, value: "৫০০+", label: "সহায়তা প্রাপ্ত পরিবার" },
  { icon: Users, value: "৮০+", label: "নিয়মিত সেচ্ছাসেবক" },
  { icon: GraduationCap, value: "১২০+", label: "শিক্ষা সহায়তা পাওয়া শিশু" },
  { icon: Stethoscope, value: "২৫+", label: "চিকিৎসা ক্যাম্প ও কর্মসূচি" },
];

export function Stats() {
  return (
    <section aria-label="আমাদের অর্জন" className="relative bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15">
                    <Icon className="w-6 h-6" aria-hidden />
                  </span>
                  <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
                  <span className="text-sm md:text-base text-primary-foreground/85">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
