"use client";

import { motion } from "framer-motion";
import { Globe, Workflow, Bell, BarChart3 } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import { easeOut } from "@/lib/utils";

const steps = [
  { icon: Globe, title: "Smart Website", desc: "Built to capture qualified leads 24/7" },
  { icon: Workflow, title: "n8n Automation", desc: "Routes every lead instantly" },
  { icon: Bell, title: "Instant Notifications", desc: "Email, WhatsApp, and Slack alerts" },
  { icon: BarChart3, title: "Track & Optimize", desc: "Know which channels perform" },
];

export default function SystemFlow() {
  return (
    <Section>
      <SectionHeading tag="How it works" title="What the system does" />
      <div className="grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="relative">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-semibold text-ink">{s.title}</h3>
              <p className="text-sm text-ink-muted">{s.desc}</p>
            </motion.div>
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute right-0 top-7 -mr-4 text-brand-500/30">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
