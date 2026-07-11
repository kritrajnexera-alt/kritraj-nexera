import type { Metadata } from "next";
import { Mail, Calendar, Clock, Zap } from "lucide-react";
import Container from "@/components/Container";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us how leads reach you today. We'll show you exactly where a system would capture, route, and convert them. Get a quote — no obligation.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-line py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-brand-400">Contact</p>
            <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] text-ink">
              Let&apos;s build your system
            </h1>
            <p className="mt-5 text-lg text-ink-muted">
              Tell us a bit about your business. We&apos;ll get back with how a
              site-plus-automation system would fit — and what it&apos;d be
              worth to you.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            {/* Form */}
            <div className="rounded-3xl border border-line bg-surface p-8 sm:p-10">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-4 text-lg font-semibold text-ink">
                  Prefer to reach out directly?
                </h2>
                <ul className="space-y-4 text-sm">
                  <li>
                    <a
                      href="mailto:hello@kritrajnexera.com"
                      className="flex items-start gap-3 text-ink hover:text-brand-400"
                    >
                      <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      <span>
                        hello@kritrajnexera.com
                        <span className="block text-xs text-ink-muted">
                          We reply within one business day
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-start gap-3 text-ink hover:text-brand-400"
                    >
                      <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      <span>
                        Book a 20-min call
                        <span className="block text-xs text-ink-muted">
                          Calendar link coming soon
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-brand-500/20 bg-brand-500/[0.05] p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-brand-400" />
                  <span className="text-sm font-semibold text-ink">
                    What happens next
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm text-ink-muted">
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                    We review your current lead flow
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                    We map where a system would capture more
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-400" />
                    You get a clear quote — no pressure, no jargon
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
