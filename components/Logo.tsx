import Link from "next/link";

/**
 * Wordmark logo — abstract geometric mark (CSS, no image dependency)
 * + KritRaj Nexera wordmark. Blue gradient shard + silver accent.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}>
      {/* Geometric mark — silver base triangle + blue spearhead overlay */}
      <span className="relative inline-flex h-8 w-8 items-center justify-center">
        <span
          className="absolute inset-0 rotate-45 rounded-[6px]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-silver-500), var(--color-silver-300))",
          }}
        />
        <span
          className="absolute inset-[5px] rotate-45 rounded-[4px]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-700), var(--color-brand-500))",
          }}
        />
      </span>
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
