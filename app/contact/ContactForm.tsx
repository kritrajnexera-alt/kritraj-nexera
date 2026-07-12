"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Button from "@/components/Button";
import { Input, Textarea, Select } from "@/components/Field";

type Status = "idle" | "loading" | "success" | "error";

const budgets = [
  "Under ₹25,000", "₹25,000 – ₹75,000", "₹75,000 – ₹2,00,000",
  "₹2,00,000+", "Not sure yet",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle2 className="mb-4 h-12 w-12 text-brand-400" />
        <h3 className="mb-2 text-lg font-semibold text-ink">Message sent</h3>
        <p className="mb-6 max-w-sm text-sm text-ink-muted">
          Thanks for reaching out. We&apos;ll review your business and get back within one business day.
        </p>
        <Button href="/" variant="secondary">Back to home</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" name="name" required placeholder="Your name" />
        <Input label="Email" name="email" type="email" required placeholder="you@company.com" />
      </div>
      <Input label="Company" name="company" placeholder="Your business" />
      <Select label="Budget" name="budget" placeholder="Select a range" options={budgets} />
      <Textarea label="Message" name="message" required placeholder="Tell us how leads reach you today." />
      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle className="h-4 w-4 shrink-0" /> {errorMsg}
        </div>
      )}
      <Button type="submit" disabled={status === "loading"} className="w-full">
        {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending...</> : "Send message"}
      </Button>
    </form>
  );
}
