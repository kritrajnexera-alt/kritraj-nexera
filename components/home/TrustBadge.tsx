"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";

const easeOut = [0.25, 1, 0.5, 1] as const;

const stats = [
  { value: "50+", label: "Systems Shipped" },
  { value: "200+", label: "Leads Captured Monthly" },
  { value: "<60s", label: "Average Response Time" },
  { value: "99.9%", label: "Uptime Guaranteed" },
];

export default function TrustBadge() {
  return (
    <section className="border-y border-line/60 bg-surface/30">
      <Container>
        <div className="grid grid-cols-2 gap-6 py-10 sm:py-12 md:grid-cols-4">
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: easeOut, delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-2xl font-semibold text-brand-400 sm:text-3xl">
                {value}
              </p>
              <p className="mt-1 text-xs text-ink-muted sm:text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
