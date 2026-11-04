"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Loader2,
  Send,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";
import { SITE } from "@/lib/site";

const CONTACT_INFO: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}[] = [
  {
    icon: Phone,
    label: "ফোন / WhatsApp",
    value: SITE.phone,
    href: `tel:+88${SITE.phoneRaw}`,
  },
  {
    icon: Mail,
    label: "ইমেইল",
    value: "info@khaskorrafoundation.org",
  },
  {
    icon: MapPin,
    label: "ঠিকানা",
    value: "খাসকররা ফাউন্ডেশন অফিস, খাসকররা",
  },
  {
    icon: Clock,
    label: "যোগাযোগের সময়",
    value: "প্রতিদিন সকাল ৯টা — রাত ৯টা",
  },
];

export function Contact() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) {
      toast({
        title: "তথ্য অসম্পূর্ণ",
        description: "অনুগ্রহ করে আপনার নাম ও বার্তা লিখুন।",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "দুঃখিত! বার্তা পাঠানো যায়নি।");
      toast({
        title: "বার্তা পাঠানো হয়েছে ✅",
        description: "ধন্যবাদ! আমরা যত দ্রুত সম্ভব আপনার সাথে যোগাযোগ করব।",
      });
      setForm({ name: "", phone: "", message: "" });
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
    <section id="contact" className="py-16 md:py-24 bg-secondary/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="যোগাযোগ করুন"
          title="কোনো প্রশ্ন বা পরামর্শ"
          highlight="আছে?"
          description="অনুদান, সেচ্ছাসেবী কাজ বা সাধারণ যেকোনো বিষয়ে আমাদের সাথে কথা বলুন।"
        />

        <div className="grid lg:grid-cols-5 gap-10 items-start">
          {/* Info cards */}
          <FadeIn className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {CONTACT_INFO.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 bg-white rounded-2xl shadow-sm ring-1 ring-black/5 p-5"
                  >
                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary shrink-0">
                      <Icon className="w-5 h-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="font-semibold text-foreground break-words hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-foreground break-words">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn delay={0.12} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-md ring-1 ring-black/5 p-6 md:p-8 space-y-5"
            >
              <h3 className="text-xl font-bold text-foreground">
                আমাদের বার্তা পাঠান
              </h3>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="c-name">
                    আপনার নাম <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="c-name"
                    placeholder="নাম লিখুন"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-phone">মোবাইল নম্বর (ঐচ্ছিক)</Label>
                  <Input
                    id="c-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="01XXXXXXXXX"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="c-message">
                  আপনার বার্তা <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="c-message"
                  placeholder="কী জানতে চান বা বলতে চান, লিখুন..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto h-12 px-8 text-base font-semibold bg-primary hover:bg-primary/90"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    বার্তা পাঠান
                  </>
                )}
              </Button>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
