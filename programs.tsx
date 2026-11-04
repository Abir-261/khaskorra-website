"use client";

import Image from "next/image";
import {
  HandHeart,
  Snowflake,
  GraduationCap,
  Stethoscope,
  CloudRain,
  Heart,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const PROGRAMS = [
  {
    icon: HandHeart,
    image: "/images/food.png",
    alt: "দরিদ্র পরিবারের মাঝে খাদ্য প্যাকেজ বিতরণ",
    title: "খাদ্য সহায়তা",
    description:
      "ক্ষুধার্ত ও দরিদ্র পরিবারের মাঝে চাল, ডাল, তেলসহ খাদ্য প্যাকেজ বিতরণ করা হয়, যাতে কেউ না খেয়ে থাকতে না হয়।",
  },
  {
    icon: Snowflake,
    image: "/images/winter.png",
    alt: "শীতকালে বৃদ্ধ মানুষের মাঝে কম্বল ও শীতবস্ত্র বিতরণ",
    title: "শীতবস্ত্র বিতরণ",
    description:
      "প্রতি শীতকালে গরিব ও বৃদ্ধ মানুষের মাঝে কম্বল, চাদর ও শীতবস্ত্র বিতরণ করে শীতের দুর্ভোগ লাঘব করা হয়।",
  },
  {
    icon: GraduationCap,
    image: "/images/education.png",
    alt: "গ্রামের শিশুদের পড়াশোনায় সহায়তা",
    title: "শিক্ষা সহায়তা",
    description:
      "দরিদ্র ও মেধাবী শিক্ষার্থীদের মাঝে বই-খাতা, শিক্ষা উপকরণ ও বৃত্তির মাধ্যমে পড়াশোনায় পাশে থাকা হয়।",
  },
  {
    icon: Stethoscope,
    image: "/images/medical.png",
    alt: "অসহায় রোগীদের জন্য ফ্রি মেডিকেল ক্যাম্প",
    title: "চিকিৎসা সহায়তা",
    description:
      "অসহায় রোগীদের জন্য ফ্রি মেডিকেল ক্যাম্প, ওষুধ ও চিকিৎসা সহায়তা দেওয়া হয়, যাতে টাকার অভাবে কেউ চিকিৎসা থেকে বঞ্চিত না হয়।",
  },
  {
    icon: CloudRain,
    image: "/images/relief.png",
    alt: "বন্যায় আক্রান্ত এলাকায় ত্রাণ বিতরণ",
    title: "দুর্যোগে ত্রাণ",
    description:
      "বন্যা, ঝড় ও অন্যান্য দুর্যোগে আক্রান্ত এলাকায় দ্রুত ত্রাণ সামগ্রী ও পুনর্বাসনে সহায়তা করা হয়।",
  },
  {
    icon: Heart,
    image: "/images/elderly.png",
    alt: "বৃদ্ধ ও অসহায় মানুষের পাশে সেচ্ছাসেবকরা",
    title: "অসহায়দের পাশে",
    description:
      "বৃদ্ধ, বিধবা, অসহায় ও প্রতিবন্ধী মানুষের জীবনমান উন্নয়নে নিয়মিত আর্থিক ও বস্তুগত সহায়তা দেওয়া হয়।",
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-16 md:py-24 bg-secondary/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="আমাদের কার্যক্রম"
          title="যেসব কাজের মাধ্যমে আমরা"
          highlight="মানুষের পাশে থাকি"
          description="খাদ্য থেকে শিক্ষা, চিকিৎসা থেকে দুর্যোগ ত্রাণ — মানুষের বিপদের সময় আমরা পাশে দাঁড়াই।"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((program, i) => {
            const Icon = program.icon;
            return (
              <FadeIn key={program.title} delay={(i % 3) * 0.08}>
                <Card className="h-full overflow-hidden rounded-2xl border-border/60 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary shrink-0">
                        <Icon className="w-5 h-5" aria-hidden />
                      </span>
                      <h3 className="text-lg font-bold text-foreground">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {program.description}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
