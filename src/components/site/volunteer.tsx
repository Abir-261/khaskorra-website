"use client";

import { useState } from "react";
import { Loader2, Users, HandHeart, HeartHandshake } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const BENEFITS = [
  {
    icon: HandHeart,
    title: "সেবার সুযোগ",
    text: "সরাসরি মাঠপর্যায়ে দরিদ্র মানুষের সাহায্য করার সুযোগ",
  },
  {
    icon: Users,
    title: "টিম সাপোর্ট",
    text: "অভিজ্ঞ সেচ্ছাসেবক টিমের সাথে কাজ করার অভিজ্ঞতা",
  },
  {
    icon: HeartHandshake,
    title: "নেকির পথ",
    text: "প্রতিটি সেবার সুযোগ — কারো জীবনে পরিবর্তনের অংশ হোন",
  },
];

export function Volunteer() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    message: "",
  });

  const update = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "অনুগ্রহ করে আপনার নাম ও মোবাইল নম্বর দিন।",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "দুঃখিত! নিবন্ধন করা যায়নি।");
      toast({
        title: "ধন্যবাদ! 🤝",
        description: "আপনার সেচ্ছাসেবী নিবন্ধন সফল হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।",
      });
      setForm({ name: "", phone: "", email: "", address: "", message: "" });
    } catch (err) {
      toast({
        title: "সমস্যা হয়েছে",
        description:
          err instanceof Error ? err.message : "আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="volunteer" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="সেচ্ছাসেবী হোন"
          title="আপনিও হোন মানবতার কাজের"
          highlight="অংশীদার"
          description="সময়, শ্রম বা পরামর্শ — যেভাবে পারেন, মানবতার কাজে আপনার হাত বাড়িয়ে দিন।"
        />

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Benefits */}
          <FadeIn>
            <div className="space-y-5">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex items-start gap-4 rounded-2xl bg-secondary/70 p-5"
                  >
                    <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="w-6 h-6" aria-hidden />
                    </span>
                    <div>
                      <h3 className="font-bold text-foreground">{b.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {b.text}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="rounded-2xl bg-primary text-primary-foreground p-6">
                <p className="text-lg font-semibold">
                  &ldquo;মানুষের সেবাই মানুষের সেরা কাজ।&rdquo;
                </p>
                <p className="mt-2 text-sm text-primary-foreground/85">
                  একটি মেসেজ দিলেই আপনি আমাদের সেচ্ছাসেবক টিমের অংশ হতে পারেন।
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.12}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-md ring-1 ring-black/5 p-6 md:p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="v-name">
                    আপনার নাম <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="v-name"
                    placeholder="পুরো নাম লিখুন"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="v-phone">
                    মোবাইল নম্বর <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="v-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={update("phone")}
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="v-email">ইমেইল (ঐচ্ছিক)</Label>
                  <Input
                    id="v-email"
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="v-address">এলাকা / ঠিকানা (ঐচ্ছিক)</Label>
                  <Input
                    id="v-address"
                    placeholder="গ্রাম/শহর, জেলা"
                    value={form.address}
                    onChange={update("address")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="v-message">আপনার বার্তা (ঐচ্ছিক)</Label>
                <Textarea
                  id="v-message"
                  placeholder="কেন সেচ্ছাসেবী হতে চান, সংক্ষেপে লিখুন..."
                  rows={4}
                  value={form.message}
                  onChange={update("message")}
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <HandHeart className="w-5 h-5 mr-2" />
                    সেচ্ছাসেবী হিসেবে নিবন্ধন করুন
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                নিবন্ধনের পর আমাদের টিম আপনার সাথে যোগাযোগ করবে, ইনশাআল্লাহ।
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
