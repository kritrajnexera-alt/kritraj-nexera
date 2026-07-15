"use client";

import { motion } from "framer-motion";

function sd(seed: number) {
  const x = Math.sin(seed * 1.618) * 10000;
  return x - Math.floor(x);
}

const dots = Array.from({ length: 20 }, (_, i) => ({
  x: sd(i) * 100,
  y: sd(i + 50) * 100,
  size: 2 + sd(i + 100) * 4,
  delay: sd(i + 150) * 6,
  duration: 3 + sd(i + 200) * 4,
}));

export default function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0" style={{ zIndex: -1 }} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(121, 110, 255, 0.12) 1.5px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />
      {dots.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand-400"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
          }}
          animate={{
            opacity: [0.1, 0.7, 0.1],
            scale: [1, 1.6, 1],
          }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: d.delay,
          }}
        />
      ))}
    </div>
  );
}
