"use client";

import { motion } from "framer-motion";
import { Search, PenTool, Workflow, TrendingUp } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { easeOut } from "@/lib/utils";

const steps = [
  { icon: Search, title: "Audit", desc: "We map how leads reach you today and find where they slip through." },
  { icon: PenTool, title: "Design", desc: "We design a site-plus-automation system that fits your specific funnel." },
  { icon: Workflow, title: "Build & Wire", desc: "We build the site and connect it to n8n, CRM, email, and WhatsApp." },
  { icon: TrendingUp, title: "Launch & Optimize", desc: "Live. Then we tune the flow based on real data." },
];

export default function Process() {
  return (
    <Section>
      <SectionHeading tag="Our process" title="From audit to live system" />
      <div className="grid gap-8 md:grid-cols-4">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: easeOut, delay: i * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400">
                <s.icon className="h-6 w-6" />
              </div>
              <span className="absolute -right-2 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-[11px] font-bold text-white">
                0{i + 1}
              </span>
            </div>
            <h3 className="mb-2 font-semibold text-ink">{s.title}</h3>
            <p className="text-sm leading-relaxed text-ink-muted">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
