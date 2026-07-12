"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Button from "@/components/Button";
import { Input, Textarea, Select } from "@/components/Field";
import { easeOut } from "@/lib/utils";

const businessTypes = [
  "Real Estate", "Healthcare / Dental", "E-commerce / Retail",
  "Legal / Consulting", "Education / Coaching", "Home Services",
  "Software / SaaS", "Other",
];

type DemoFormProps = { onSuccess: (data: Record<string, string>) => void };

export default function DemoForm({ onSuccess }: DemoFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    if (formData.get("website")) { setStatus("idle"); return; }

    const payload = {
      name: formData.get("name") as string,
      businessName: formData.get("businessName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      businessType: formData.get("businessType") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      onSuccess(payload);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to submit");
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      <h2 className="mb-1 text-lg font-semibold text-ink">Submit a Demo Lead</h2>
      <p className="mb-6 text-sm text-ink-muted">
        Fill this in as a real prospect would. Watch the automation timeline on the right process it live.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" name="name" required placeholder="Your name" />
          <Input label="Business Name" name="businessName" required placeholder="Your business" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Email" name="email" type="email" required placeholder="you@company.com" />
          <Input label="Phone" name="phone" type="tel" required placeholder="+91 98765 43210" />
        </div>
        <Select label="Business Type" name="businessType" required placeholder="Select your business type" options={businessTypes} />
        <Textarea label="Message" name="message" rows={3} placeholder="Any specific question?" />
        {status === "error" && (
          <div className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-400">{errorMsg}</div>
        )}
        <Button type="submit" disabled={status === "loading"} className="w-full">
          {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing Demo...</> : "Run Live Demo"}
        </Button>
      </form>
    </motion.div>
  );
}
