"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import LeadCapture from "@/components/diagnostic/LeadCapture";
import QuestionCard from "@/components/diagnostic/QuestionCard";
import ResultsReport from "@/components/diagnostic/ResultsReport";
import { diagnose, type Answers } from "@/lib/diagnostic-engine";

type Step = 0 | 1 | 2 | 3 | 4;
// 0 = lead capture, 1-3 = questions, 4 = results

const questions = [
  {
    question: "How do most of your leads come in right now?",
    options: [
      "Website form",
      "WhatsApp",
      "Phone calls",
      "Social media DMs",
      "Referrals",
      "Paid ads",
      "Walk-ins",
    ],
    multiSelect: true,
    key: "channels" as const,
  },
  {
    question: "How fast do you typically respond to a new enquiry?",
    options: [
      "Under 30 minutes",
      "1-4 hours",
      "Same day",
      "Next day or later",
      "Depends — sometimes never",
    ],
    key: "responseTime" as const,
  },
  {
    question: "What happens after you first contact a lead?",
    options: [
      "We follow up within a day",
      "We try but often forget",
      "We leave it to them",
      "We have a CRM that handles it",
      "Nothing — if they don't buy, we move on",
    ],
    key: "followUp" as const,
  },
];

export default function DiagnosticClient() {
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [result, setResult] = useState<ReturnType<typeof diagnose> | null>(null);

  const handleLeadSubmit = useCallback(
    (data: { name: string; email: string }) => {
      setName(data.name);
      setEmail(data.email);
      setStep(1);
    },
    [],
  );

  function handleQuestion(answer: string | string[]) {
    const q = questions[step - 1];

    if (q.key === "channels") {
      setAnswers((prev) => ({ ...prev, channels: answer as string[] }));
    } else if (q.key === "responseTime") {
      setAnswers((prev) => ({
        ...prev,
        responseTime: answer as Answers["responseTime"],
      }));
    } else if (q.key === "followUp") {
      setAnswers((prev) => ({
        ...prev,
        followUp: answer as Answers["followUp"],
      }));
    }

    // Compute results on last question
    if (step === 3 && answers) {
      const fullAnswers: Answers = {
        channels: (q.key === "channels" ? answer : answers.channels) as string[],
        responseTime: (q.key === "responseTime" ? answer : answers.responseTime) as Answers["responseTime"],
        followUp: (q.key === "followUp" ? answer : answers.followUp) as Answers["followUp"],
      };
      const res = diagnose(fullAnswers);
      setResult(res);
    }

    setStep((s) => Math.min(s + 1, 4) as Step);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] flex-col items-center justify-center">
      {/* Progress bar */}
      {step > 0 && step < 4 && (
        <div className="mb-10 flex w-full max-w-lg items-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i < step ? "bg-brand-500" : "bg-line"
              }`}
            />
          ))}
          <span className="text-xs text-ink-muted">
            {step === 4 ? "Done" : `${step}/3`}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && <LeadCapture key="lead" onSubmit={handleLeadSubmit} />}

        {step >= 1 && step <= 3 && (
          <QuestionCard
            key={`q-${step}`}
            step={step}
            total={3}
            question={questions[step - 1].question}
            options={questions[step - 1].options}
            multiSelect={questions[step - 1].multiSelect ?? false}
            onSelect={handleQuestion}
          />
        )}

        {step === 4 && result && (
          <ResultsReport key="results" result={result} email={email} />
        )}
      </AnimatePresence>
    </div>
  );
}
