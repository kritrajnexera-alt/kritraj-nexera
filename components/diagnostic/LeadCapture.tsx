"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import type { BusinessType } from "@/lib/diagnostic-engine";

const businessTypes: BusinessType[] = [
  "Real Estate",
  "Healthcare / Dental",
  "E-commerce / Retail",
  "Legal / Consulting",
  "Education / Coaching",
  "Home Services",
  "Software / SaaS",
  "Other",
];

type LeadData = {
  name: string;
  email: string;
  businessType: BusinessType;
};

type Props = {
  onSubmit: (data: LeadData) => void;
};

export default function LeadCapture({ onSubmit }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    if (!businessType) e.businessType = "Select your business type";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    // Capture lead via existing contact API (fire-and-forget)
    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        company: businessType,
        budget: "Diagnostic user",
        message: `Completed free business diagnostic. Business type: ${businessType}`,
      }),
    }).catch(() => {
      /* fire-and-forget — don't block the flow */
    });

    // Short delay for feel, then proceed
    await new Promise((r) => setTimeout(r, 400));
    setSending(false);
    onSubmit({ name, email, businessType: businessType as BusinessType });
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      onSubmit={handleSubmit}
      className="w-full max-w-lg space-y-5"
    >
      <p className="mb-2 text-sm text-ink-muted">
        Enter your details to get a personalized report. We&apos;ll also email it
        to you.
      </p>

      <Field label="Name" value={name} onChange={setName} error={errors.name} />
      <Field label="Email" type="email" value={email} onChange={setEmail} error={errors.email} />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">
          Business Type
        </label>
        <select
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          className={`w-full rounded-xl border bg-bg px-4 py-3 text-sm text-ink transition-colors focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 ${
            errors.businessType ? "border-red-400/50" : "border-line"
          }`}
        >
          <option value="" disabled>
            Select your business type
          </option>
          {businessTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {errors.businessType && (
          <p className="mt-1 text-xs text-red-400">{errors.businessType}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
      >
        {sending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting...
          </>
        ) : (
          <>
            Start Free Diagnostic
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  error,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-bg px-4 py-3 text-sm text-ink transition-colors placeholder:text-ink-muted/50 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400 ${
          error ? "border-red-400/50" : "border-line"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
