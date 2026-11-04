"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const PHOTOS = [
  {
    src: "/images/hero.png",
    alt: "গ্রামের দরিদ্র মানুষের মাঝে খাদ্য বিতরণ কর্মসূচি",
    caption: "খাদ্য বিতরণ কর্মসূচি",
    span: "md:col-span-2",
  },
  {
    src: "/images/food.png",
    alt: "খাদ্য প্যাকেজ প্রস্তুত ও বিতরণ",
    caption: "খাদ্য প্যাকেজ বিতরণ",
    span: "",
  },
  {
    src: "/images/winter.png",
    alt: "শীতকালে কম্বল বিতরণ",
    caption: "শীতবস্ত্র বিতরণ",
    span: "",
  },
  {
    src: "/images/education.png",
    alt: "শিক্ষা সহায়তা কর্মসূচি",
    caption: "শিক্ষা সহায়তা",
    span: "",
  },
  {
    src: "/images/medical.png",
    alt: "ফ্রি মেডিকেল ক্যাম্প",
    caption: "ফ্রি মেডিকেল ক্যাম্প",
    span: "",
  },
  {
    src: "/images/relief.png",
    alt: "বন্যায় আক্রান্ত এলাকায় ত্রাণ কার্যক্রম",
    caption: "দুর্যোগে ত্রাণ",
    span: "md:col-span-2",
  },
  {
    src: "/images/elderly.png",
    alt: "বৃদ্ধ ও অসহায় মানুষের পাশে সেচ্ছাসেবকরা",
    caption: "অসহায়দের পাশে",
    span: "",
  },
  {
    src: "/images/about.png",
    alt: "সেচ্ছাসেবকদের সেবা কার্যক্রম",
    caption: "সেবার ঝলক",
    span: "",
  },
  {
    src: "/images/eid-gift.png",
    alt: "দরিদ্র শিশুদের মাঝে ঈদ উপহার ও নতুন বস্ত্র বিতরণ",
    caption: "উপহার বিতরণ",
    span: "",
  },
  {
    src: "/images/team.png",
    alt: "খাসকররা ফাউন্ডেশনের সেচ্ছাসেবক টিম",
    caption: "আমাদের টিম",
    span: "",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="গ্যালারি"
          title="আমাদের কার্যক্রমের"
          highlight="ঝলক"
          description="আমাদের সেচ্ছাসেবকদের মাঠপর্যায়ের কাজের কিছু মুহূর্ত।"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {PHOTOS.map((photo, i) => (
            <FadeIn
              key={photo.src + photo.caption}
              delay={(i % 4) * 0.06}
              className={photo.span}
            >
              <figure className="group relative h-56 md:h-52 rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                <figcaption className="absolute bottom-0 inset-x-0 p-4 text-white font-medium text-sm flex items-end justify-between">
                  {photo.caption}
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    +
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
