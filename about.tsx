"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const GOALS = [
  "ক্ষুধার্ত ও দরিদ্র পরিবারের খাদ্য নিরাপত্তা নিশ্চিত করা",
  "অসহায় রোগীদের চিকিৎসা ও ওষুধের সহায়তা দেওয়া",
  "দরিদ্র ও মেধাবী শিক্ষার্থীদের পাশে থাকা",
  "শীতকালে কম্বল ও শীতবস্ত্র বিতরণ করা",
  "দুর্যোগে আক্রান্ত মানুষের দ্রুত ত্রাণ ও পুনর্বাসন",
];

export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="আমাদের সম্পর্কে"
          title="খাসকররা ফাউন্ডেশন"
          highlight="কেন কাজ করে?"
        />

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image side */}
          <FadeIn className="order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-lg ring-1 ring-black/5">
                <Image
                  src="/images/about.png"
                  alt="খাসকররা ফাউন্ডেশনের সেচ্ছাসেবকরা একজন বৃদ্ধ মহিলাকে খাদ্য সহায়তা দিচ্ছেন"
                  width={1024}
                  height={1024}
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 md:right-6 bg-accent text-accent-foreground rounded-2xl shadow-lg px-5 py-4 max-w-[220px]">
                <p className="text-2xl font-bold leading-tight">সেবাই আমাদের</p>
                <p className="text-xl font-bold leading-tight">অঙ্গীকার</p>
              </div>
            </div>
          </FadeIn>

          {/* Text side */}
          <FadeIn delay={0.1} className="order-1 lg:order-2">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                মানবতা আর ভরসার হাত বাড়িয়ে দিই অসহায়ের দিকে
              </h3>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                খাসকররা ফাউন্ডেশন একটি অরাজনৈতিক, অলাভজনক ও দাতব্য স্বেচ্ছাসেবী
                সংগঠন। সমাজের বিত্তবান ও আত্মীকৃত মানুষ থেকে শুরু করে দুঃখী-দরিদ্র
                অসহায় মানুষের পাশে দাঁড়ানোই আমাদের একমাত্র লক্ষ্য। আমরা বিশ্বাস
                করি — সমাজের সবাই মিলে এগিয়ে এলে কেউ রাতে না খেয়ে ঘুমাতে পারবে না।
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                আমাদের সেচ্ছাসেবক টিম সারা বছর বিভিন্ন এলাকায় খাদ্য বিতরণ,
                শীতবস্ত্র, শিক্ষা সহায়তা ও চিকিৎসা কর্মসূচি পরিচালনা করে।
                আপনার দান-অনুদান ও সহযোগিতা এই কাজকে আরও বড় আকার দেবে।
              </p>

              <ul className="mt-6 space-y-3">
                {GOALS.map((goal) => (
                  <li key={goal} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 text-primary shrink-0"
                      aria-hidden
                    />
                    <span className="text-foreground/90">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
