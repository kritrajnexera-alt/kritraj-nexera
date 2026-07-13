"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

type Props = {
  step: number;
  total: number;
  question: string;
  options: string[];
  multiSelect?: boolean;
  onSelect: (answer: string | string[]) => void;
};

export default function QuestionCard({
  step,
  total,
  question,
  options,
  multiSelect = false,
  onSelect,
}: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [singleSelected, setSingleSelected] = useState("");

  function handleToggle(option: string) {
    if (multiSelect) {
      setSelected((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      );
    } else {
      setSingleSelected(option);
    }
  }

  function handleSubmit() {
    if (multiSelect) {
      onSelect(selected);
    } else if (singleSelected) {
      onSelect(singleSelected);
    }
  }

  const hasAnswer = multiSelect ? selected.length > 0 : !!singleSelected;

  return (
    <motion.div
      key={question}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="w-full max-w-lg"
    >
      <p className="mb-1 text-sm font-medium text-brand-400">
        Question {step} of {total}
      </p>
      <h2 className="mb-6 text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {question}
      </h2>

      <div className="space-y-3">
        {options.map((option) => {
          const isActive = multiSelect
            ? selected.includes(option)
            : singleSelected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-colors ${
                isActive
                  ? "border-brand-500 bg-brand-500/10 text-ink"
                  : "border-line bg-surface text-ink hover:border-brand-500/40"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  isActive
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-line bg-bg"
                }`}
              >
                {isActive && <Check className="h-3 w-3" />}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {multiSelect && (
        <p className="mt-3 text-xs text-ink-muted">
          Select all that apply
        </p>
      )}

      <button
        type="button"
        disabled={!hasAnswer}
        onClick={handleSubmit}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {step < total ? (
          <>Next <ArrowRight className="h-4 w-4" /></>
        ) : (
          <>See Results <ArrowRight className="h-4 w-4" /></>
        )}
      </button>
    </motion.div>
  );
}
