"use client";

import { useRef, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  speed?: number;
  className?: string;
};

export default function ParallaxSection({ children, speed = 0.5, className }: Props) {
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;
    const viewportH = window.innerHeight;
    let raf: number;

    function update() {
      const rect = parent!.getBoundingClientRect();
      const center = (rect.top + rect.bottom) / 2;
      const offset = (center - viewportH / 2) / viewportH;
      el!.style.transform = `translateY(${offset * speed * 200}px)`;
      raf = requestAnimationFrame(update);
    }

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}
