"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import { easeOut } from "@/lib/utils";

const workflowSteps = [
  "Lead Submitted", "Webhook Triggered", "CRM Updated",
  "Google Sheets Updated", "Email Notification", "Automation Complete",
];

export default function DemoPreview() {
  return (
    <Section>
      <SectionHeading tag="See it in action" title="See Our Sales Engine in Action" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.1 }}
        className="mx-auto max-w-lg rounded-2xl border border-line bg-surface p-6"
      >
        <div className="mb-4 text-center">
          <p className="text-sm font-semibold text-ink">Automation Workflow</p>
          <p className="text-xs text-ink-muted">What happens when a lead comes through</p>
        </div>
        <div className="space-y-0">
          {workflowSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3 py-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                {i < workflowSteps.length - 1 ? (
                  <CheckCircle2 className="h-5 w-5 text-brand-500/60" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-brand-500/60" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-ink">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: easeOut, delay: 0.2 }}
        className="mt-10 text-center"
      >
        <Button href="/demo" className="group">
          Try Live Demo <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </motion.div>
    </Section>
  );
}
