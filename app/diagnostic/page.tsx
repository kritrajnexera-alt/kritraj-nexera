import type { Metadata } from "next";
import Container from "@/components/Container";
import DiagnosticClient from "./DiagnosticClient";

export const metadata: Metadata = {
  title: "Free Business Growth Diagnostic",
  description:
    "Find out where you're losing leads. Answer 3 questions about your current sales process and get a personalized report with specific fixes.",
};

export default function DiagnosticPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <DiagnosticClient />
      </Container>
    </section>
  );
}
