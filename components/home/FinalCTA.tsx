import { ArrowRight } from "lucide-react";
import Section from "@/components/Section";
import Button from "@/components/Button";

export default function FinalCTA() {
  return (
    <Section className="relative overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-brand-500/10 blur-[120px]" />
      </div>
      <div className="relative">
        <p className="mb-3 text-sm font-medium text-brand-400">Ready to build your system?</p>
        <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-tight text-ink">
          Let&apos;s build your sales engine
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-ink-muted">
          Tell us how leads reach you today. We&apos;ll show you exactly where a
          system would capture, route, and convert them.
        </p>
        <div className="mt-8">
          <Button href="/contact" className="group">
            Book a Free Strategy Call
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </Section>
  );
}
