"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  LockKeyhole,
  ReceiptText,
  Megaphone,
  Trash2,
  Loader2,
  LayoutDashboard,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { formatDateBn, formatTaka } from "@/lib/bn";
import { CATEGORIES } from "@/lib/site";

type Expense = {
  id: string;
  title: string;
  category: string;
  amount: number;
  spentAt: string;
};

type Announcement = { id: string; text: string; createdAt: string };

const PASSCODE_KEY = "kf-admin-passcode";

export default function AdminPage() {
  const { toast } = useToast();
  const [passcode, setPasscode] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [checking, setChecking] = useState(false);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [expForm, setExpForm] = useState({
    title: "",
    category: CATEGORIES[0] as string,
    amount: "",
    note: "",
    spentAt: new Date().toISOString().slice(0, 10),
  });
  const [annText, setAnnText] = useState("");
  const [busy, setBusy] = useState<string | null>(null);

  const authHeaders = useCallback(
    (code: string): HeadersInit => ({
      "Content-Type": "application/json",
      "x-admin-passcode": code,
    }),
    []
  );

  const loadData = useCallback(
    async (code: string) => {
      try {
        const [expRes, annRes] = await Promise.all([
          fetch("/api/ledger"),
          fetch("/api/announcements?admin=1", {
            headers: { "x-admin-passcode": code },
          }),
        ]);
        if (annRes.status === 401) {
          // পাসকোড বদলে গেলে লগআউট
          sessionStorage.removeItem(PASSCODE_KEY);
          setLoggedIn(false);
          return;
        }
        const ledger = await expRes.json();
        if (ledger.expenses !== undefined) {
          setExpenses(ledger.expenses ?? []);
        }
        const ann = await annRes.json();
        setAnnouncements(Array.isArray(ann.adminItems) ? ann.adminItems : []);
      } catch {
        /* ignore */
      }
    },
    []
  );

  useEffect(() => {
    const saved = sessionStorage.getItem(PASSCODE_KEY);
    if (saved) {
      setPasscode(saved);
      setLoggedIn(true);
      loadData(saved);
    }
  }, [loadData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    try {
      // পাসকোড যাচাই: এডমিন এন্ডপয়েন্টে হালকা GET কল
      const res = await fetch("/api/announcements?admin=1", {
        headers: { "x-admin-passcode": passcode },
      });
      if (res.status === 401) {
        toast({
          title: "ভুল পাসকোড",
          description: "আবার চেষ্টা করুন।",
          variant: "destructive",
        });
        return;
      }
      sessionStorage.setItem(PASSCODE_KEY, passcode);
      setLoggedIn(true);
      loadData(passcode);
      toast({ title: "স্বাগতম!", description: "এডমিন প্যানেলে প্রবেশ করেছেন।" });
    } finally {
      setChecking(false);
    }
  };

  const addExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy("expense");
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: authHeaders(passcode),
        body: JSON.stringify({
          title: expForm.title,
          category: expForm.category,
          amount: Number(expForm.amount),
          note: expForm.note || undefined,
          spentAt: expForm.spentAt || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "যোগ হয়নি",
          description: data.error ?? "আবার চেষ্টা করুন।",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "খরচ যোগ হয়েছে ✅", description: "ওয়েবসাইটে প্রকাশিত হয়েছে।" });
      setExpForm({
        title: "",
        category: CATEGORIES[0] as string,
        amount: "",
        note: "",
        spentAt: new Date().toISOString().slice(0, 10),
      });
      loadData(passcode);
    } finally {
      setBusy(null);
    }
  };

  const addAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy("announcement");
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: authHeaders(passcode),
        body: JSON.stringify({ text: annText }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast({
          title: "যোগ হয়নি",
          description: data.error ?? "আবার চেষ্টা করুন।",
          variant: "destructive",
        });
        return;
      }
      toast({ title: "ঘোষণা যোগ হয়েছে ✅", description: "ব্রেকিং টিকারে দেখা যাবে।" });
      setAnnText("");
      loadData(passcode);
    } finally {
      setBusy(null);
    }
  };

  const deleteExpense = async (id: string) => {
    const res = await fetch(`/api/expenses?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(passcode),
    });
    if (res.ok) {
      toast({ title: "মুছে ফেলা হয়েছে" });
      loadData(passcode);
    } else {
      toast({ title: "মোছা যায়নি", variant: "destructive" });
    }
  };

  const deleteAnnouncement = async (id: string) => {
    const res = await fetch(`/api/announcements?id=${id}`, {
      method: "DELETE",
      headers: authHeaders(passcode),
    });
    if (res.ok) {
      toast({ title: "ঘোষণা মুছে ফেলা হয়েছে" });
      loadData(passcode);
    } else {
      toast({ title: "মোছা যায়নি", variant: "destructive" });
    }
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-secondary/40 flex items-center justify-center px-4">
        <Card className="w-full max-w-md rounded-3xl shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-3">
                <LockKeyhole className="w-7 h-7" aria-hidden />
              </span>
              <h1 className="text-2xl font-bold text-foreground">এডমিন প্যানেল</h1>
              <p className="text-sm text-muted-foreground mt-1">
                খাসকররা ফাউন্ডেশন — খরচ ও ঘোষণা ব্যবস্থাপনা
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="passcode">এডমিন পাসকোড</Label>
                <Input
                  id="passcode"
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="পাসকোড লিখুন"
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={checking}
                className="w-full bg-primary hover:bg-primary/90 font-semibold"
              >
                {checking ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> যাচাই হচ্ছে…
                  </>
                ) : (
                  "প্রবেশ করুন"
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              পাসকোড সার্ভারের .env ফাইলে (ADMIN_PASSCODE) পরিবর্তন করা যায়।
            </p>
            <div className="text-center mt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> ওয়েবসাইটে ফিরে যান
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <header className="bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between gap-3">
          <h1 className="text-lg md:text-xl font-bold flex items-center gap-2.5">
            <LayoutDashboard className="w-6 h-6" aria-hidden />
            এডমিন প্যানেল — খাসকররা ফাউন্ডেশন
          </h1>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> সাইট
            </Link>
          </Button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-8 items-start">
        {/* খরচ যোগ করুন */}
        <Card className="rounded-3xl shadow-md">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5 mb-5">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-destructive/10 text-destructive">
                <ReceiptText className="w-5 h-5" aria-hidden />
              </span>
              খরচ যোগ করুন
            </h2>
            <form onSubmit={addExpense} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="exp-title">খরচের বিবরণ *</Label>
                <Input
                  id="exp-title"
                  value={expForm.title}
                  onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                  placeholder="যেমন: ২০টি পরিবারের জন্য খাদ্য প্যাকেজ কেনা"
                  required
                  minLength={3}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="exp-category">খাত *</Label>
                  <select
                    id="exp-category"
                    value={expForm.category}
                    onChange={(e) => setExpForm({ ...expForm, category: e.target.value })}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exp-amount">টাকা *</Label>
                  <Input
                    id="exp-amount"
                    type="number"
                    min={1}
                    value={expForm.amount}
                    onChange={(e) => setExpForm({ ...expForm, amount: e.target.value })}
                    placeholder="যেমন: ৫০০০"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="exp-date">তারিখ</Label>
                <Input
                  id="exp-date"
                  type="date"
                  value={expForm.spentAt}
                  onChange={(e) => setExpForm({ ...expForm, spentAt: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="exp-note">নোট (ঐচ্ছিক)</Label>
                <Input
                  id="exp-note"
                  value={expForm.note}
                  onChange={(e) => setExpForm({ ...expForm, note: e.target.value })}
                  placeholder="যেমন: কারওয়ান বাজার থেকে কেনা হয়েছে"
                />
              </div>
              <Button
                type="submit"
                disabled={busy === "expense"}
                className="w-full bg-primary hover:bg-primary/90 font-semibold"
              >
                {busy === "expense" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> যোগ হচ্ছে…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1.5" /> খরচ যোগ করুন
                  </>
                )}
              </Button>
            </form>

            {/* সাম্প্রতিক খরচ লিস্ট */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                সাম্প্রতিক খরচ ({expenses.length} টি)
              </h3>
              <ul className="divide-y divide-border/70 max-h-80 overflow-y-auto">
                {expenses.map((exp) => (
                  <li key={exp.id} className="flex items-center justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {exp.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exp.category} · {formatTaka(exp.amount)} ·{" "}
                        {formatDateBn(exp.spentAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label={`${exp.title} মুছে ফেলুন`}
                      onClick={() => deleteExpense(exp.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
                {expenses.length === 0 && (
                  <li className="text-sm text-muted-foreground py-4 text-center">
                    কোনো খরচ নেই।
                  </li>
                )}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* ঘোষণা যোগ করুন */}
        <Card className="rounded-3xl shadow-md">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2.5 mb-5">
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/40 text-accent-foreground">
                <Megaphone className="w-5 h-5" aria-hidden />
              </span>
              ব্রেকিং নিউজ ঘোষণা
            </h2>
            <form onSubmit={addAnnouncement} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="ann-text">ঘোষণার লেখা *</Label>
                <Textarea
                  id="ann-text"
                  value={annText}
                  onChange={(e) => setAnnText(e.target.value)}
                  placeholder="যেমন: আগামী শুক্রবার শীতবস্ত্র বিতরণ কর্মসূচি অনুষ্ঠিত হবে, ইনশাআল্লাহ।"
                  rows={3}
                  required
                  minLength={4}
                />
              </div>
              <Button
                type="submit"
                disabled={busy === "announcement"}
                className="w-full bg-primary hover:bg-primary/90 font-semibold"
              >
                {busy === "announcement" ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> যোগ হচ্ছে…
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-1.5" /> ঘোষণা যোগ করুন
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">
                ঘোষণা সাথে সাথে হোমপেজের ব্রেকিং টিকারে চলতে শুরু করবে। সাম্প্রতিক
                দানকারীদের নামও টিকারে স্বয়ংক্রিয়ভাবে দেখানো হয়।
              </p>
            </form>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                সক্রিয় ঘোষণা ({announcements.length} টি)
              </h3>
              <ul className="divide-y divide-border/70 max-h-60 overflow-y-auto">
                {announcements.map((ann) => (
                  <li key={ann.id} className="flex items-start justify-between gap-3 py-2.5">
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">{ann.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {formatDateBn(ann.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      aria-label="ঘোষণা মুছে ফেলুন"
                      onClick={() => deleteAnnouncement(ann.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
                {announcements.length === 0 && (
                  <li className="text-sm text-muted-foreground py-4 text-center">
                    কোনো ঘোষণা নেই।
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl bg-secondary/60 border border-border p-4">
              <p className="text-sm font-semibold text-foreground mb-1.5">
                💡 টিকারে যা যা দেখানো হয়:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li>আপনার যোগ করা ঘোষণাগুলো</li>
                <li>সাম্প্রতিক দানকারীদের নাম, পরিমাণ ও খাত (স্বয়ংক্রিয়)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
