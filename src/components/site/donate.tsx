"use client";

import Image from "next/image";
import {
  HandHeart,
  Smartphone,
  ShieldCheck,
  Copy,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";
import { SITE } from "@/lib/site";

// অনুদান গ্রহণের মাধ্যম — বিকাশ (নগদ/রকেট/ব্যাংক নম্বর পেলে এখানে যোগ করুন)
const PAYMENTS = [
  {
    icon: Smartphone,
    name: "বিকাশ (Personal)",
    number: SITE.bkash,
  },
];

const HELP_TIERS = [
  {
    image: "/images/food.png",
    alt: "খাদ্য সহায়তার জন্য অনুদান",
    amount: "৫০০ টাকা",
    text: "একটি দরিদ্র পরিবারের জন্য কয়েকদিনের খাদ্য প্যাকেজ",
  },
  {
    image: "/images/winter.png",
    alt: "শীতবস্ত্র সহায়তার জন্য অনুদান",
    amount: "১,০০০ টাকা",
    text: "শীতকালে একজন বৃদ্ধের জন্য কম্বল ও শীতবস্ত্র প্যাকেজ",
  },
  {
    image: "/images/education.png",
    alt: "শিক্ষা সহায়তার জন্য অনুদান",
    amount: "২,০০০ টাকা",
    text: "একজন দরিদ্র শিশুর বছরের শিক্ষা উপকরণ ও সহায়তা",
  },
];

export function Donate() {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(text);
      toast({
        title: "কপি হয়েছে",
        description: "অনুদানের নম্বরটি কপি করা হয়েছে।",
      });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast({
        title: "কপি করা যায়নি",
        description: "নম্বরটি ম্যানুয়ালি নোট করে নিন।",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="donate" className="py-16 md:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="অনুদান করুন"
          title="আপনার দান হবে"
          highlight="কারো জীবনের ভরসা"
          description="ছোট বা বড় — প্রতিটি অনুদান দরিদ্র মানুষের জীবনে স্মাইল ফেরায়। আজই সদকা বা দান করুন।"
        />

        {/* Help tiers */}
        <div className="grid sm:grid-cols-3 gap-5 mb-14">
          {HELP_TIERS.map((tier, i) => (
            <FadeIn key={tier.amount} delay={i * 0.08}>
              <Card className="h-full rounded-2xl overflow-hidden border-border/60 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-36">
                  <Image
                    src={tier.image}
                    alt={tier.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-3 left-3 bg-accent text-accent-foreground text-sm font-bold px-3 py-1 rounded-full shadow">
                    {tier.amount}
                  </span>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {tier.text}
                  </p>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Payment info */}
          <FadeIn>
            <div className="bg-white rounded-3xl shadow-md ring-1 ring-black/5 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary">
                  <HandHeart className="w-6 h-6" aria-hidden />
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  যেভাবে অনুদান পাঠাবেন
                </h3>
              </div>

              <div className="space-y-3">
                {PAYMENTS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div
                      key={method.name}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary text-primary shrink-0">
                          <Icon className="w-5 h-5" aria-hidden />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {method.name}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {method.number}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="shrink-0 text-primary hover:bg-secondary hover:text-primary"
                        aria-label={`${method.name} নম্বর কপি করুন`}
                        onClick={() => handleCopy(method.number)}
                      >
                        {copied === method.number ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl bg-accent/20 border border-accent/50 p-4 text-sm text-accent-foreground leading-relaxed">
                <p className="flex items-start gap-2">
                  <MessageCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                  অনুদান পাঠানোর পর রসিদ/স্ক্রিনশটসহ আমাদের WhatsApp
                  ({SITE.whatsapp}) নম্বরে জানান — প্রতিটি অনুদানের জবাবদিহি আমরা দিই।
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Why trust */}
          <FadeIn delay={0.12}>
            <div className="h-full flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                আপনার অনুদান কোথায় খরচ হয়?
              </h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                প্রতিটি অনুদান সরাসরি মাঠপর্যায়ের কার্যক্রমে খরচ হয় — খাদ্য
                প্যাকেজ, শীতবস্ত্র, শিক্ষা উপকরণ ও চিকিৎসা সহায়তায়। প্রতিটি
                কর্মসূচির ছবি ও বিবরণ আমাদের পাতায় প্রকাশ করা হয়।
              </p>
              <ul className="mt-6 space-y-4">
                {[
                  "প্রতিটি কর্মসূচির ছবি ও রিপোর্ট প্রকাশ করা হয়",
                  "সেচ্ছাসেবকদের মাধ্যমে সরাসরি হাতে হাতে বিতরণ",
                  "অনুদানকারীকে প্রয়োজনে কর্মসূচিতে অংশ নেওয়ার আমন্ত্রণ",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <ShieldCheck
                      className="w-5 h-5 mt-0.5 text-primary shrink-0"
                      aria-hidden
                    />
                    <span className="text-foreground/90">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-3xl overflow-hidden shadow-md ring-1 ring-black/5 hidden sm:block">
                <Image
                  src="/images/medical.png"
                  alt="অসহায় মানুষের জন্য চিকিৎসা ক্যাম্প"
                  width={1344}
                  height={768}
                  className="w-full h-56 object-cover"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
