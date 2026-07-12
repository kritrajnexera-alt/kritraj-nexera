"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import { easeOut } from "@/lib/utils";

const stats = [
  { value: "50+", label: "Active lead systems" },
  { value: "<15s", label: "Avg. first response" },
  { value: "4x", label: "Lead conversion lift" },
  { value: "99.9%", label: "Automation uptime" },
];

export default function TrustBadge() {
  return (
    <section className="border-y border-line/60 bg-surface/30">
      <Container className="py-8">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-2xl font-bold text-brand-400 sm:text-3xl">{s.value}</p>
              <p className="mt-1 text-xs text-ink-muted">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
