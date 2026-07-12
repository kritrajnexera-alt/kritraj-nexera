import Container from "@/components/Container";
import SystemInMotion from "./SystemInMotion";
import HeroCopy from "./HeroCopy";

export default function Hero() {
  return (
    <section className="overflow-hidden py-20 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <HeroCopy />
          <SystemInMotion />
        </div>
      </Container>
    </section>
  );
}
