import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import TrustBadge from "@/components/home/TrustBadge";

const DifferenceSplit = dynamic(() => import("@/components/home/DifferenceSplit"));
const SystemFlow = dynamic(() => import("@/components/home/SystemFlow"));
const BeforeAfter = dynamic(() => import("@/components/home/BeforeAfter"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const DemoPreview = dynamic(() => import("@/components/home/DemoPreview"));
const FeaturedWork = dynamic(() => import("@/components/home/FeaturedWork"));
const Process = dynamic(() => import("@/components/home/Process"));
const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

export const metadata: Metadata = {
  title: "KritRaj Nexera — We Build Sales Engines, Not Websites",
  description:
    "AI automation and website development agency — modern sites wired to n8n that capture every enquiry, route it, and convert more prospects into sales.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadge />
      <DifferenceSplit />
      <SystemFlow />
      <BeforeAfter />
      <Testimonials />
      <DemoPreview />
      <FeaturedWork />
      <Process />
      <FinalCTA />
    </>
  );
}
