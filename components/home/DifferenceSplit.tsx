"use client";

import { motion } from "framer-motion";
import { FileImage, XCircle, TrendingUp, Zap, Bell, BarChart3, Users } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { easeOut } from "@/lib/utils";

export default function DifferenceSplit() {
  const bars = [72, 88, 45, 94, 63, 81];
  return (
    <Section>
      <SectionHeading tag="The gap" title="Here's the difference" />
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut }}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-ink/60">
              <FileImage className="h-5 w-5" />
              <h3 className="font-semibold">Agencies That Redesign</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-ink-muted"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/60" />New look, same broken funnel</li>
              <li className="flex items-start gap-2 text-sm text-ink-muted"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/60" />No lead tracking after launch</li>
              <li className="flex items-start gap-2 text-sm text-ink-muted"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/60" />You chase clients, not the other way</li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
            className="rounded-2xl border border-brand-500/30 bg-surface p-6"
          >
            <div className="mb-4 flex items-center gap-2 text-brand-400">
              <TrendingUp className="h-5 w-5" />
              <h3 className="font-semibold">KritRaj Nexera</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-ink"><Zap className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />Site + automation = lead machine</li>
              <li className="flex items-start gap-2 text-sm text-ink"><Bell className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />Instant alerts to your phone</li>
              <li className="flex items-start gap-2 text-sm text-ink"><BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />Every lead tracked and measured</li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
          className="mt-10 rounded-2xl border border-line bg-surface p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-ink">
            <Users className="h-5 w-5 text-brand-400" />
            <h3 className="font-semibold text-ink">Lead response time by channel</h3>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {bars.map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: easeOut, delay: 0.3 + i * 0.08 }}
                  className="w-full rounded-t bg-gradient-to-t from-brand-500/40 to-brand-400"
                  style={{ minHeight: 20 }}
                />
                <span className="text-[10px] text-ink-muted">{["Email", "Chat", "Web", "Phone", "Social", "WhatsApp"][i]}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
