"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, ArrowRight, Zap, Clock, TrendingUp } from "lucide-react";
import Container from "@/components/Container";
import Button from "@/components/Button";

const easeOut = [0.25, 1, 0.5, 1] as const;

const benefits = [
  { icon: Zap, text: "Find where you're losing leads" },
  { icon: Clock, text: "See how response time kills conversions" },
  { icon: TrendingUp, text: "Get a personalized fix plan" },
];

export default function DiagnosticPreview() {
  return (
    <section className="border-y border-line bg-surface/40 py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
          >
            <p className="mb-3 text-sm font-medium text-brand-400">Free — 2 minutes</p>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
              How much are you losing to slow follow-ups?
            </h2>
            <p className="mt-4 text-ink-muted">
              Answer 3 quick questions about your lead process. We&apos;ll show
              you exactly where leaks are happening, what they cost, and how a
              system fixes each one.
            </p>
            <ul className="mt-6 space-y-3">
              {benefits.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-ink">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400">
                    <Icon className="h-4 w-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/diagnostic" className="group">
                <ClipboardCheck className="h-4 w-4" />
                Take Free Diagnostic
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </motion.div>

          {/* Visual — mock diagnostic card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-3xl border border-line bg-surface p-6">
              <div className="mb-4 flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5 text-brand-400" />
                <span className="text-sm font-semibold text-ink">Lead Leakage Report</span>
              </div>
              {/* Score preview */}
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-red-400/30 bg-red-400/10">
                  <span className="text-3xl font-bold text-red-400">72</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-red-400">Critical leakage</p>
                  <p className="text-xs text-ink-muted">3 problems found</p>
                </div>
              </div>
              {/* Fake problem cards */}
              {[
                { severity: "red", text: "Response time: leads go cold before first contact" },
                { severity: "amber", text: "No systematic follow-up after initial contact" },
                { severity: "red", text: "Leads scattered across channels, no CRM" },
              ].map((p, i) => (
                <div
                  key={i}
                  className={`mb-2 flex items-start gap-2 rounded-xl border p-3 ${
                    p.severity === "red"
                      ? "border-red-400/20 bg-red-400/[0.05]"
                      : "border-amber-400/20 bg-amber-400/[0.05]"
                  }`}
                >
                  <span
                    className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                      p.severity === "red" ? "bg-red-400" : "bg-amber-400"
                    }`}
                  />
                  <p className="text-xs text-ink-muted">{p.text}</p>
                </div>
              ))}
              <p className="mt-3 text-center text-[11px] text-ink-muted">
                Your actual report will be personalized to your business
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
