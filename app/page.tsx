import Hero from "@/components/hero/Hero";
import TrustBadge from "@/components/home/TrustBadge";
import DifferenceSplit from "@/components/home/DifferenceSplit";
import SystemFlow from "@/components/home/SystemFlow";
import BeforeAfter from "@/components/home/BeforeAfter";
import FeaturedWork from "@/components/home/FeaturedWork";
import Process from "@/components/home/Process";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadge />
      <DifferenceSplit />
      <SystemFlow />
      <BeforeAfter />
      <FeaturedWork />
      <Process />
      <FinalCTA />
    </>
  );
}
