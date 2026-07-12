"use client";

import { motion } from "framer-motion";
import { Inbox, AlertCircle, TrendingDown, Zap, Clock, TrendingUp } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { easeOut } from "@/lib/utils";

const before = [
  { icon: Inbox, text: "Leads land in a shared inbox" },
  { icon: AlertCircle, text: "Nobody checks for hours" },
  { icon: TrendingDown, text: "Most leads go cold" },
];

const after = [
  { icon: Zap, text: "Lead triggers instant automation" },
  { icon: Clock, text: "Response in under 60 seconds" },
  { icon: TrendingUp, text: "Conversion rates climb" },
];

export default function BeforeAfter() {
  return (
    <Section muted>
      <SectionHeading tag="The difference" title="Before the system. After the system." />
      <div className="grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="rounded-2xl border border-line bg-surface p-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-ink/60">Before</h3>
          <ul className="space-y-4">
            {before.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-ink-muted">
                <item.icon className="h-4 w-4 shrink-0 text-red-400/60" />
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
          className="rounded-2xl border border-brand-500/30 bg-surface p-6"
        >
          <h3 className="mb-4 text-lg font-semibold text-brand-400">After</h3>
          <ul className="space-y-4">
            {after.map((item) => (
              <li key={item.text} className="flex items-center gap-3 text-sm text-ink">
                <item.icon className="h-4 w-4 shrink-0 text-brand-400" />
                {item.text}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
