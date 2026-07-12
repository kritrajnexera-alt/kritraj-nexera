import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-500 text-white hover:bg-brand-600 shadow-sm shadow-brand-600/20",
  secondary:
    "border border-line bg-surface text-ink hover:border-brand-300 hover:text-brand-600",
};

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
  type,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3",
    "text-sm font-medium transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    variants[variant],
    disabled && "cursor-not-allowed opacity-60",
    className,
  );

  if (type === "submit" || type === "button") {
    return <button type={type} disabled={disabled} className={classes}>{children}</button>;
  }

  return <Link href={href!} className={classes}>{children}</Link>;
}
