"use client";

import { motion, useScroll, useTransform } from "framer-motion";

function sd(seed: number) {
  const x = Math.sin(seed * 1.618) * 10000;
  return x - Math.floor(x);
}

const drops = Array.from({ length: 35 }, (_, i) => ({
  x: sd(i) * 100,
  startY: sd(i + 50) * 120 - 20,
  size: 1.5 + sd(i + 100) * 3,
  dur: 6 + sd(i + 150) * 10,
  delay: sd(i + 200) * 8,
  blur: sd(i + 250) > 0.5 ? 1 : 0,
}));

export default function WaveLayer() {
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 2000], [0, -200]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: -1, y: parallaxY }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(121, 110, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-brand-400/35"
          style={{
            left: `${d.x}%`,
            top: `${d.startY}%`,
            width: d.size,
            height: d.size,
            filter: d.blur ? "blur(1px)" : "none",
          }}
          animate={{ y: ["-20vh", "120vh"] }}
          transition={{
            duration: d.dur,
            repeat: Infinity,
            ease: "linear",
            delay: d.delay,
          }}
        />
      ))}
    </motion.div>
  );
}
