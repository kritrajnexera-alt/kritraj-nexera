"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  useTransform,
} from "framer-motion";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  CheckCircle2,
  ArrowRight,
  Mail,
} from "lucide-react";
import Button from "@/components/Button";
import type { Result } from "@/lib/diagnostic-engine";

const easeOut = [0.25, 1, 0.5, 1] as const;

type Props = {
  result: Result;
  email: string;
};

const severityConfig = {
  "Low leakage": { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-400", icon: CheckCircle2 },
  "Moderate leakage": { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", icon: AlertTriangle },
  "Critical leakage": { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-400", icon: AlertCircle },
};

const problemIcons: Record<string, typeof Info> = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export default function ResultsReport({ result, email }: Props) {
  const scoreRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scoreRef, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => v.toFixed(0));

  if (inView && count.get() === 0) {
    animate(count, result.score, { duration: 1.5, ease: easeOut });
  }

  const sev = severityConfig[result.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: easeOut }}
      className="w-full"
    >
      {/* Score header */}
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-medium text-ink-muted">
          Your Lead Leakage Score
        </p>
        <div ref={scoreRef} className="inline-flex flex-col items-center">
          <div
            className={`flex h-32 w-32 items-center justify-center rounded-full border-2 ${sev.border} ${sev.bg}`}
          >
            <span className={`text-5xl font-bold ${result.severityColor}`}>
              <motion.span>{rounded}</motion.span>
            </span>
          </div>
          <p className={`mt-3 text-sm font-semibold ${result.severityColor}`}>
            {result.severity}
          </p>
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-muted">
          {result.score <= 30
            ? "Your lead process is in good shape. Minor tweaks with automation could push it further."
            : result.score <= 60
              ? "You're losing a meaningful portion of your leads. A system would plug the biggest gaps."
              : "Urgent: most of your leads are slipping through the cracks. A system would transform your pipeline."}
        </p>
      </div>

      {/* Problems */}
      <div className="mb-10">
        <h3 className="mb-4 text-lg font-semibold text-ink">
          {result.problems.length} problems found
        </h3>
        <div className="space-y-4">
          {result.problems.map((problem, i) => {
            const Icon = problemIcons[problem.severity];
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeOut, delay: 0.1 + i * 0.08 }}
                className="rounded-2xl border border-line bg-surface p-5"
              >
                <div className="mb-2 flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
                      problem.severity === "critical"
                        ? "bg-red-400/10 text-red-400"
                        : problem.severity === "warning"
                          ? "bg-amber-400/10 text-amber-400"
                          : "bg-brand-400/10 text-brand-400"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{problem.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                      {problem.description}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-brand-500/10 px-2 py-0.5 text-xs font-medium text-brand-400">
                        {problem.tier} System
                      </span>
                      <span className="text-xs text-ink-muted">→</span>
                      <span className="text-xs text-ink">
                        {problem.solution}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Impact */}
      <div className="mb-10 rounded-2xl border border-brand-500/20 bg-brand-500/[0.05] p-6">
        <h3 className="mb-3 text-sm font-semibold text-ink">
          What fixing these problems would look like
        </h3>
        <ul className="space-y-2">
          {result.impact.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-ink-muted"
            >
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Email notice + CTA */}
      <div className="rounded-2xl border border-line bg-surface p-6 text-center">
        <Mail className="mx-auto mb-3 h-6 w-6 text-brand-400" />
        <p className="text-sm text-ink-muted">
          We&apos;ll email this full report to{" "}
          <span className="font-medium text-ink">{email}</span>
        </p>
        <div className="mt-6">
          <Button href="/contact">
            Book a Free Strategy Call
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          20-minute call. We map where a system would plug your biggest gaps.
        </p>
      </div>
    </motion.div>
  );
}
