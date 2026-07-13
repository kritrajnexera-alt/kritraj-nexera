import Link from "next/link";
import Image from "next/image";

/**
 * Logo — real mark image + CSS wordmark.
 * Mark is transparent PNG (white bg removed for dark theme).
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <Image
        src="/logo.png"
        alt="KritRaj Nexera logo"
        width={1535}
        height={1024}
        className="h-8 w-auto shrink-0 transition-transform group-hover:scale-105"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight text-ink">
          KritRaj Nexera
        </span>
        <span className="text-[10px] font-medium tracking-wide text-ink-muted">
          Growth Systems
        </span>
      </span>
    </Link>
  );
}
