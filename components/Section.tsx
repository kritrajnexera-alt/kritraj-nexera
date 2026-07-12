import { cn } from "@/lib/utils";
import Container from "./Container";

export default function Section({
  children,
  className,
  muted = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  muted?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", muted && "bg-surface/40")}>
      <Container className={className}>{children}</Container>
    </section>
  );
}
