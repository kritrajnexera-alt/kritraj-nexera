"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle, Bell, UserPlus, Bot, Database, ArrowRight } from "lucide-react";
import { easeOut } from "@/lib/utils";

const nodeVariants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: easeOut },
  }),
};

const flowDuration = 3;
const stagger = 5;

function FlowCard({ icon, label, sub, delay }: { icon: React.ReactNode; label: string; sub: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: easeOut }}
      className="flex items-center gap-3 rounded-xl border border-line bg-bg px-4 py-3"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-muted">{sub}</p>
      </div>
      <motion.div
        className="ml-auto flex h-2 w-2"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: "easeInOut" }}
      >
        <span className="h-2 w-2 rounded-full bg-green-400" />
      </motion.div>
    </motion.div>
  );
}

function FlowPulse({ delay }: { delay: number }) {
  return (
    <motion.div
      className="flex items-center justify-center py-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: flowDuration, repeat: Infinity, repeatDelay: stagger, delay, ease: "easeInOut" }}
    >
      <motion.div
        className="flex items-center gap-2 text-xs text-brand-400"
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowRight className="h-3.5 w-3.5" />
        Routing...
      </motion.div>
    </motion.div>
  );
}

export default function SystemInMotion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
      className="relative mx-auto w-full max-w-md"
    >
      <div className="rounded-2xl border border-line bg-surface p-5 shadow-lg shadow-brand-900/10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-ink-muted">
          System in motion
        </p>

        <div className="space-y-2">
          <motion.div custom={0} variants={nodeVariants} initial="initial" animate="animate" className="flex items-center gap-2 rounded-xl border border-line bg-bg px-3 py-2 text-sm text-ink">
            <UserPlus className="h-4 w-4 text-brand-400" /> New lead arrives
          </motion.div>
          <FlowPulse delay={0.5} />

          <FlowCard icon={<Bot className="h-4 w-4" />} label="n8n Workflow" sub="Triggers automation" delay={1.2} />
          <FlowPulse delay={2.5} />

          <FlowCard icon={<Database className="h-4 w-4" />} label="CRM + Sheets" sub="Lead data recorded" delay={2.8} />
          <FlowPulse delay={4} />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5, duration: 0.5 }}
            className="flex flex-wrap gap-2 pt-1"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
              <Mail className="h-3 w-3" /> Email alert
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              <MessageCircle className="h-3 w-3" /> WhatsApp
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-400">
              <Bell className="h-3 w-3" /> Sales notified
            </span>
          </motion.div>
        </div>

        <motion.div
          className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 5 }}
        >
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-brand-500 to-green-400"
            initial={{ width: "0%" }}
            animate={{ width: ["0%", "40%", "70%", "100%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
