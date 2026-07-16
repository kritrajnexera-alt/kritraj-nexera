import type { Metadata } from "next";
import Hero from "@/components/hero/Hero";
import TrustBadge from "@/components/home/TrustBadge";
import DifferenceSplit from "@/components/home/DifferenceSplit";
import SystemFlow from "@/components/home/SystemFlow";
import BeforeAfter from "@/components/home/BeforeAfter";
import Testimonials from "@/components/home/Testimonials";
import DemoPreview from "@/components/home/DemoPreview";
import FeaturedWork from "@/components/home/FeaturedWork";
import Process from "@/components/home/Process";
import FinalCTA from "@/components/home/FinalCTA";

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
