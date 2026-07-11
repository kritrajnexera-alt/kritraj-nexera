"use client";

import { motion } from "framer-motion";
import {
  FileImage,
  XCircle,
  TrendingUp,
  Zap,
  Bell,
  BarChart3,
  Users,
} from "lucide-react";
import Section from "@/components/Section";

const easeOut = [0.25, 1, 0.5, 1] as const;

const brochureFailures = [
  "Leads land in an inbox nobody checks till evening",
  "No follow-up — hot leads go cold by tomorrow",
  "You can't tell which page actually drove the enquiry",
  "Site looks nice. Sales stay flat.",
];

const systemWins = [
  { icon: Bell, label: "Instant WhatsApp + email alert the second a lead lands" },
  { icon: Zap, label: "Auto-routed to the right person in under 60 seconds" },
  { icon: Users, label: "Dropped straight into your CRM, tagged and scored" },
  { icon: BarChart3, label: "One dashboard: where leads came from, what closed" },
];

const bottomCallouts = [
  { icon: Zap, label: "Automated Follow-ups" },
  { icon: Bell, label: "Real-Time Lead Alerts" },
  { icon: BarChart3, label: "One Dashboard, Full Visibility" },
  { icon: TrendingUp, label: "Insights That Drive Decisions" },
];

export default function DifferenceSplit() {
  return (
    <Section id="difference">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-sm font-medium text-brand-400">
          Here&apos;s the difference
        </p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
          A brochure sits there.
          <br />
          A system does the work.
        </h2>
      </div>

      {/* Split comparison */}
      <div className="grid items-stretch gap-0 overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
        {/* LEFT — Other agencies / brochure site */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="relative border-b border-line p-8 lg:border-b-0 lg:border-r"
        >
          {/* Desaturated mock browser */}
          <div className="mb-6 rounded-xl border border-line bg-bg/50 p-1 opacity-60">
            <div className="flex gap-1.5 px-2 py-1.5">
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
              <span className="h-2 w-2 rounded-full bg-line" />
            </div>
            <div className="space-y-2 p-4">
              <div className="h-6 w-1/2 rounded bg-line/70" />
              <div className="h-3 w-3/4 rounded bg-line/50" />
              <div className="mt-3 h-20 w-full rounded bg-line/30" />
              <div className="h-7 w-24 rounded bg-line/60" />
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <FileImage className="h-5 w-5 text-ink-muted" />
            <h3 className="text-lg font-semibold text-ink-muted">
              Other Agencies
            </h3>
          </div>

          <ul className="space-y-3">
            {brochureFailures.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-ink-muted">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                {f}
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-line pt-4 text-sm italic text-ink-muted">
            A website is a brochure. It looks good but it doesn&apos;t do the
            work.
          </p>
        </motion.div>

        {/* RIGHT — KritRaj Nexera system */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="relative bg-brand-500/[0.04] p-8"
        >
          {/* Live-feeling dashboard card cluster */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-brand-500/20 bg-surface p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-400">
                <Users className="h-3.5 w-3.5" /> New Leads
              </div>
              <p className="mt-1 text-2xl font-semibold text-ink">47</p>
              <p className="text-[10px] text-brand-400">▲ 23% this week</p>
            </div>
            <div className="rounded-xl border border-brand-500/20 bg-surface p-3">
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand-400">
                <Zap className="h-3.5 w-3.5" /> Deals Won
              </div>
              <p className="mt-1 text-2xl font-semibold text-ink">12</p>
              <p className="text-[10px] text-brand-400">▲ 41% this week</p>
            </div>
          </div>

          {/* Mini chart bar */}
          <div className="mb-6 rounded-xl border border-line bg-surface p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-medium text-ink-muted">
                Pipeline
              </span>
              <TrendingUp className="h-3.5 w-3.5 text-brand-400" />
            </div>
            <div className="flex h-16 items-end gap-1.5">
              {[35, 50, 42, 65, 58, 80, 72].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOut, delay: i * 0.06 }}
                  className="flex-1 rounded-t bg-brand-500/60"
                />
              ))}
            </div>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-ink">KritRaj Nexera</h3>
          </div>

          <ul className="space-y-3">
            {systemWins.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-start gap-2.5 text-sm text-ink">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {label}
              </li>
            ))}
          </ul>

          <p className="mt-6 border-t border-line pt-4 text-sm italic text-ink">
            A system does the work — it runs even when you&apos;re not there.
          </p>
        </motion.div>
      </div>

      {/* Bottom callouts */}
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {bottomCallouts.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: easeOut, delay: i * 0.08 }}
            className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-surface/50 p-5 text-center"
          >
            <Icon className="h-5 w-5 text-brand-400" />
            <span className="text-sm font-medium text-ink">{label}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
