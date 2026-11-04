"use client";

import { useEffect, useState } from "react";
import { Megaphone, CircleAlert } from "lucide-react";

// ডেটা না এলে বা খালি থাকলে যে ঘোষণাগুলো দেখানো হবে
const FALLBACK_ITEMS = [
  "খাসকররা ফাউন্ডেশন — দরিদ্র ও অসহায় মানুষের পাশে আমরা",
  "আপনার অনুদানের প্রতিটি টাকার হিসাব ওয়েবসাইটে প্রকাশ করা হয়",
  "সেচ্ছাসেবী হতে চাইলে ভিজিট করুন — সেচ্ছাসেবী সেকশন",
];

type TickerData = { items?: string[] };

export function BreakingNews() {
  const [items, setItems] = useState<string[]>(FALLBACK_ITEMS);

  useEffect(() => {
    let alive = true;
    fetch("/api/announcements")
      .then((r) => r.json())
      .then((data: TickerData) => {
        if (alive && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {
        /* fallback items থাকবে */
      });
    return () => {
      alive = false;
    };
  }, []);

  const loop = [...items, ...items]; // seamless loop-এর জন্য দুইবার

  return (
    <div
      className="bg-foreground text-primary-foreground border-t border-white/10"
      role="region"
      aria-label="ব্রেকিং নিউজ — সর্বশেষ আপডেট"
    >
      <div className="max-w-7xl mx-auto flex items-stretch">
        {/* ব্রেকিং ব্যাজ */}
        <span className="flex items-center gap-1.5 shrink-0 bg-red-600 text-white text-[11px] md:text-xs font-bold px-3 md:px-4 tracking-wide">
          <CircleAlert className="w-3.5 h-3.5 animate-pulse" aria-hidden />
          ব্রেকিং
        </span>

        {/* স্ক্রলিং টিকার */}
        <div className="relative flex-1 overflow-hidden" aria-live="off">
          <div className="flex w-max animate-ticker py-2">
            {loop.map((item, i) => (
              <span
                key={i}
                aria-hidden={i >= items.length}
                className="flex items-center gap-2 whitespace-nowrap px-5 text-xs md:text-sm text-primary-foreground/90"
              >
                <Megaphone className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
