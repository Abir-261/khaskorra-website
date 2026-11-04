"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Utensils,
  Shirt,
  GraduationCap,
  Stethoscope,
  LifeBuoy,
  HeartHandshake,
  Wallet,
  HandHeart,
  ReceiptText,
  PiggyBank,
  Users,
  Info,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";
import { formatTaka, formatDateBn, toBn } from "@/lib/bn";
import { CATEGORIES } from "@/lib/site";

type Donation = {
  id: string;
  name: string;
  amount: number;
  category: string;
  message: string | null;
  createdAt: string;
};

type Expense = {
  id: string;
  title: string;
  category: string;
  amount: number;
  note: string | null;
  spentAt: string;
};

type Ledger = {
  totals: {
    donations: number;
    expenses: number;
    balance: number;
    donationCount: number;
    expenseCount: number;
  };
  byCategory: { category: string; amount: number; count: number }[];
  donations: Donation[];
  expenses: Expense[];
};

// খাত অনুযায়ী আইকন
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "খাদ্য সহায়তা": Utensils,
  "শীতবস্ত্র": Shirt,
  "শিক্ষা সহায়তা": GraduationCap,
  "চিকিৎসা সহায়তা": Stethoscope,
  "দুর্যোগ ত্রাণ": LifeBuoy,
  "অসহায়দের পাশে": HeartHandshake,
  "সাধারণ তহবিল": Wallet,
};

function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = CATEGORY_ICONS[category] ?? Wallet;
  return <Icon className={className} />;
}

const initialForm = {
  name: "",
  phone: "",
  amount: "",
  category: CATEGORIES[0] as string,
  message: "",
  anonymous: false,
};

export function Transparency() {
  const { toast } = useToast();
  const [ledger, setLedger] = useState<Ledger | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const loadLedger = useCallback(async () => {
    try {
      const res = await fetch("/api/ledger");
      if (!res.ok) throw new Error("failed");
      const data: Ledger = await res.json();
      setLedger(data);
    } catch {
      /* লোড ব্যর্থ হলে ডিফল্ট খালি অবস্থা দেখাবে */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadLedger();
  }, [loadLedger]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone || undefined,
          amount: Number(form.amount),
          category: form.category,
          message: form.message || undefined,
          isPublic: !form.anonymous,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "রেকর্ড হয়নি",
          description: data.error ?? "আবার চেষ্টা করুন।",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "দান রেকর্ড হয়েছে ✅",
        description: "আল্লাহ আপনার দান কবুল করুন। তালিকায় আপনার নাম যোগ হয়েছে।",
      });
      setForm(initialForm);
      loadLedger();
    } catch {
      toast({
        title: "সমস্যা হয়েছে",
        description: "ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totals = ledger?.totals;
  const maxCategoryAmount = Math.max(1, ...(ledger?.byCategory.map((c) => c.amount) ?? [1]));

  return (
    <section id="transparency" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="স্বচ্ছতা রিপোর্ট"
          title="দান ও খরচের"
          highlight="পূর্ণ হিসাব"
          description="কে কোন খাতে কত দিয়েছেন আর প্রতিটি খাতে কত খরচ হয়েছে — সব খোলাখুলি এখানে প্রকাশ করা হয়। জবাবদিহিই আমাদের আস্থা।"
        />

        {/* সারসংক্ষেপ কার্ড */}
        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          <FadeIn>
            <Card className="rounded-2xl border-border/60 shadow-sm bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <HandHeart className="w-8 h-8 mx-auto mb-2 opacity-90" aria-hidden />
                <p className="text-sm opacity-85">মোট দান আদায়</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">
                  {loading ? "…" : formatTaka(totals?.donations ?? 0)}
                </p>
                <p className="text-xs opacity-75 mt-1">
                  {toBn(totals?.donationCount ?? 0)} জন দানকারীর সম্মিলিত অনুদান
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="rounded-2xl border-border/60 shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <ReceiptText className="w-8 h-8 mx-auto mb-2 text-destructive" aria-hidden />
                <p className="text-sm text-muted-foreground">মোট খরচ</p>
                <p className="text-2xl md:text-3xl font-bold mt-1 text-foreground">
                  {loading ? "…" : formatTaka(totals?.expenses ?? 0)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {toBn(totals?.expenseCount ?? 0)} টি খরচের রেকর্ড
                </p>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.16}>
            <Card className="rounded-2xl border-border/60 shadow-sm bg-white">
              <CardContent className="p-6 text-center">
                <PiggyBank className="w-8 h-8 mx-auto mb-2 text-primary" aria-hidden />
                <p className="text-sm text-muted-foreground">তহবিলে অবশিষ্ট</p>
                <p className="text-2xl md:text-3xl font-bold mt-1 text-primary">
                  {loading ? "…" : formatTaka(Math.max(0, totals?.balance ?? 0))}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  আদায় − খরচ = বর্তমান তহবিল
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* খাতভিত্তিক খরচ + সাম্প্রতিক খরচ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* খাত অনুযায়ী খরচ */}
          <FadeIn>
            <Card className="h-full rounded-3xl border-border/60 shadow-md">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  খাত অনুযায়ী খরচ
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  কোন কাজে কত টাকা খরচ হয়েছে
                </p>

                {ledger && ledger.byCategory.length > 0 ? (
                  <ul className="space-y-5">
                    {ledger.byCategory.map((cat) => (
                      <li key={cat.category}>
                        <div className="flex items-center justify-between gap-3 mb-1.5">
                          <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-secondary text-primary shrink-0">
                              <CategoryIcon category={cat.category} className="w-4 h-4" />
                            </span>
                            {cat.category}
                            <span className="text-xs text-muted-foreground">
                              ({toBn(cat.count)} টি)
                            </span>
                          </span>
                          <span className="text-sm font-bold text-foreground whitespace-nowrap">
                            {formatTaka(cat.amount)}
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-700"
                            style={{
                              width: `${Math.max(6, Math.round((cat.amount / maxCategoryAmount) * 100))}%`,
                            }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    {loading ? "লোড হচ্ছে…" : "এখনো কোনো খরচের তথ্য যোগ করা হয়নি।"}
                  </p>
                )}
              </CardContent>
            </Card>
          </FadeIn>

          {/* সাম্প্রতিক খরচসমূহ */}
          <FadeIn delay={0.1}>
            <Card className="h-full rounded-3xl border-border/60 shadow-md">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  সাম্প্রতিক খরচসমূহ
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  প্রতিটি খরচের বিস্তারিত বিবরণ
                </p>

                {ledger && ledger.expenses.length > 0 ? (
                  <ul className="divide-y divide-border/70 -mx-2">
                    {ledger.expenses.slice(0, 8).map((exp) => (
                      <li
                        key={exp.id}
                        className="flex items-start justify-between gap-4 px-2 py-3.5"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-secondary text-primary shrink-0 mt-0.5">
                            <CategoryIcon category={exp.category} className="w-4.5 h-4.5" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {exp.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              <span className="inline-block rounded-full bg-secondary px-2 py-0.5 mr-2 text-primary">
                                {exp.category}
                              </span>
                              {formatDateBn(exp.spentAt)}
                            </p>
                            {exp.note && (
                              <p className="text-xs text-muted-foreground/90 mt-1 italic">
                                {exp.note}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-destructive whitespace-nowrap mt-0.5">
                          −{formatTaka(exp.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    {loading ? "লোড হচ্ছে…" : "এখনো কোনো খরচ যোগ করা হয়নি।"}
                  </p>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* দান রেকর্ড ফর্ম + দানকারীর তালিকা */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* দান রেকর্ড ফর্ম */}
          <FadeIn>
            <Card className="rounded-3xl border-border/60 shadow-md bg-white">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                    <HandHeart className="w-5 h-5" aria-hidden />
                  </span>
                  আপনার দান রেকর্ড করুন
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  বিকাশ/নগদ/ব্যাংকে টাকা পাঠানোর পর নিচের ফর্মে তথ্য দিন — আপনার
                  নাম, খাত ও পরিমাণ পাবলিক তালিকায় প্রকাশ হবে।
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="donor-name">আপনার নাম *</Label>
                      <Input
                        id="donor-name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="যেমন: মোঃ আব্দুল করিম"
                        required
                        minLength={2}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="donor-phone">মোবাইল নম্বর (প্রাইভেট)</Label>
                      <Input
                        id="donor-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="০১XXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="donor-amount">টাকার পরিমাণ *</Label>
                      <Input
                        id="donor-amount"
                        type="number"
                        min={1}
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        placeholder="যেমন: ৫০০"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="donor-category">কোন খাতে দিয়েছেন? *</Label>
                      <select
                        id="donor-category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="donor-message">বার্তা (ঐচ্ছিক)</Label>
                    <Textarea
                      id="donor-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="দানের উদ্দেশ্য বা শুভেচ্ছা বার্তা লিখতে পারেন…"
                      rows={3}
                    />
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <Checkbox
                      checked={form.anonymous}
                      onCheckedChange={(v) => setForm({ ...form, anonymous: v === true })}
                    />
                    <span className="text-sm text-foreground/85">
                      আমার নাম প্রকাশ করবেন না (অজ্ঞাতনামে দান)
                    </span>
                  </label>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        রেকর্ড হচ্ছে…
                      </>
                    ) : (
                      "দান রেকর্ড করুন"
                    )}
                  </Button>

                  <p className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" aria-hidden />
                    মোবাইল নম্বর কখনো প্রকাশ করা হয় না — শুধু যাচাইয়ের জন্য রাখা হয়।
                  </p>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          {/* দানকারীদের তালিকা */}
          <FadeIn delay={0.1}>
            <Card className="rounded-3xl border-border/60 shadow-md bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/30 text-accent-foreground">
                      <Users className="w-5 h-5" aria-hidden />
                    </span>
                    সাম্প্রতিক দানকারীরা
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-5">
                  কে কোন খাতে কত দিয়েছেন — ধন্যবাদ সবাইকে
                </p>

                {ledger && ledger.donations.length > 0 ? (
                  <ul className="divide-y divide-border/70 -mx-2">
                    {ledger.donations.slice(0, 8).map((don) => (
                      <li
                        key={don.id}
                        className="flex items-start justify-between gap-4 px-2 py-3.5"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground">
                            {don.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            <span className="inline-block rounded-full bg-secondary px-2 py-0.5 mr-2 text-primary">
                              {don.category}
                            </span>
                            {formatDateBn(don.createdAt)}
                          </p>
                          {don.message && (
                            <p className="text-xs text-muted-foreground/90 mt-1 italic line-clamp-2">
                              “{don.message}”
                            </p>
                          )}
                        </div>
                        <span className="text-sm font-bold text-primary whitespace-nowrap mt-0.5">
                          +{formatTaka(don.amount)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground py-8 text-center">
                    {loading ? "লোড হচ্ছে…" : "এখনো কোনো দান রেকর্ড হয়নি — আপনিই হতে পারেন প্রথম দানকারী!"}
                  </p>
                )}
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
