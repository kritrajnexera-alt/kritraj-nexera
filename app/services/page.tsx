import { Check, Star, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Button from "@/components/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "One system, three tiers — each bundles a website with the automation that captures, routes, and converts your leads. Quote-based pricing, never published.",
};

type Tier = {
  name: string;
  tagline: string;
  popular?: boolean;
  features: string[];
};

const tiers: Tier[] = [
  {
    name: "Starter System",
    tagline: "Stop losing leads to a form nobody watches.",
    features: [
      "Mobile-responsive website with core pages",
      "Click-to-chat WhatsApp button",
      "One automation: form submission → instant WhatsApp + email alert",
      "Basic contact form with spam protection",
      "1 round of revisions",
      "Launch on your domain",
    ],
  },
  {
    name: "Growth System",
    tagline: "Turn enquiries into a pipeline that moves itself.",
    popular: true,
    features: [
      "Dynamic site: filterable listings, booking, or catalog",
      "Multi-step automation (3–5 actions, up to 5 app integrations)",
      "CRM, Google Sheets, WhatsApp, and Email integrations",
      "Real-time lead routing via webhook",
      "Basic SEO setup + performance baseline",
      "2 rounds of revisions",
    ],
  },
  {
    name: "Premium System",
    tagline: "A full growth engine that runs your business end-to-end.",
    features: [
      "Full CMS-managed site your team can update",
      "End-to-end interconnected automation (custom API + database)",
      "Payment gateway integration",
      "Multi-user roles and permissions",
      "Error monitoring and alerting",
      "Team training on the entire system",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="border-b border-line py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-medium text-brand-400">Services</p>
            <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-semibold leading-[1.1] text-ink">
              One system. Three levels of power.
            </h1>
            <p className="mt-5 text-lg text-ink-muted">
              Every tier bundles a website with the automation that makes it
              actually work for your business. You don&apos;t buy a site — you buy
              a system that brings in leads and closes sales.
            </p>
          </div>
        </Container>
      </section>

      {/* Tiers */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative flex flex-col rounded-3xl border p-8 ${
                  tier.popular
                    ? "border-brand-500/40 bg-brand-500/[0.06]"
                    : "border-line bg-surface"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white">
                    <Star className="mr-1 inline h-3 w-3 fill-white" />
                    Most Popular
                  </span>
                )}
                <h2 className="text-xl font-semibold text-ink">{tier.name}</h2>
                <p className="mt-2 min-h-[3rem] text-sm leading-relaxed text-ink-muted">
                  {tier.tagline}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button href="/contact" className="mt-8 w-full" variant={tier.popular ? "primary" : "secondary"}>
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Recurring care plan teaser */}
          <div className="mt-16 rounded-3xl border border-line bg-surface/50 p-8 text-center sm:p-10">
            <h3 className="text-lg font-semibold text-ink">
              Recurring Care Plan
            </h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted">
              Once your system is live, it needs keeping sharp — updates,
              automation tweaks, and performance tuning month over month. Ongoing
              support keeps your pipeline flowing.
            </p>
            <Button href="/contact" variant="secondary" className="mt-6">
              Ask about ongoing support
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
