/**
 * Business Growth Diagnostic — scoring engine.
 *
 * Takes answers from 4 diagnostic questions and produces:
 * - A lead-leakage score (0–100, higher = worse)
 * - A severity label (Low / Moderate / Critical)
 * - A list of detected problems, each with a recommended KritRaj Nexera solution
 * - An estimated impact if the problems are fixed
 *
 * All scoring is rule-based — no ML, no external API.
 */

/* ── Types ─────────────────────────────────────────────── */

export type BusinessType =
  | "Real Estate"
  | "Healthcare / Dental"
  | "E-commerce / Retail"
  | "Legal / Consulting"
  | "Education / Coaching"
  | "Home Services"
  | "Software / SaaS"
  | "Other";

export type ResponseTime =
  | "under-30min"
  | "1-4-hours"
  | "same-day"
  | "next-day"
  | "inconsistent";

export type FollowUp =
  | "within-a-day"
  | "try-but-forget"
  | "leave-to-them"
  | "crm-handles"
  | "move-on";

export type Answers = {
  channels: string[];
  responseTime: ResponseTime;
  followUp: FollowUp;
};

export type Severity = "critical" | "warning" | "info";

export type Problem = {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  solution: string;
  tier: "Starter" | "Growth" | "Premium";
};

export type Result = {
  score: number;
  severity: "Low leakage" | "Moderate leakage" | "Critical leakage";
  severityColor: string;
  problems: Problem[];
  impact: string[];
};

/* ── Scoring weights ─────────────────────────────────── */

const responseTimeScore: Record<ResponseTime, number> = {
  "under-30min": 0,
  "1-4-hours": 15,
  "same-day": 25,
  "next-day": 35,
  "inconsistent": 40,
};

const followUpScore: Record<FollowUp, number> = {
  "within-a-day": 5,
  "crm-handles": 8,
  "try-but-forget": 25,
  "leave-to-them": 35,
  "move-on": 40,
};

/* ── Problem bank ────────────────────────────────────── */

const channelProblems: Problem[] = [
  {
    id: "no-website-form",
    title: "No website form to capture visitors",
    description:
      "Your website visitors have no easy way to enquire. They browse and leave — you'll never know they were there.",
    severity: "critical",
    solution: "Capture-ready website with forms that route enquiries automatically",
    tier: "Starter",
  },
  {
    id: "no-whatsapp",
    title: "WhatsApp channel exists but isn't automated",
    description:
      "WhatsApp is a high-intent channel, but without automation you're manually copying messages and losing leads between chats.",
    severity: "warning",
    solution: "Instant WhatsApp alerts wired to every enquiry source",
    tier: "Starter",
  },
  {
    id: "scattered-channels",
    title: "Leads are scattered across multiple channels",
    description:
      "When leads come from 4+ channels with no unified system, enquiries fall through the cracks between tools.",
    severity: "critical",
    solution: "Centralized CRM that collects leads from every channel into one dashboard",
    tier: "Growth",
  },
  {
    id: "no-automation",
    title: "No channel is automated",
    description:
      "Every lead requires manual attention — which means every lead is at risk of being missed when you're busy.",
    severity: "critical",
    solution: "Full automation pipeline: capture, route, notify, follow up",
    tier: "Growth",
  },
];

const responseProblems: Problem[] = [
  {
    id: "slow-response",
    title: "Response time means leads go cold",
    description:
      "Industry data shows 78% of leads that don't hear back within an hour contact a competitor. Your current response window may be losing you the majority of hot leads.",
    severity: "critical",
    solution: "Instant WhatsApp + email alerts — respond in under 60 seconds, every time",
    tier: "Starter",
  },
  {
    id: "no-speed-system",
    title: "No system to guarantee fast response",
    description:
      "Without automation, response time depends on who's online. A lead at 11pm gets nothing. A lead during a busy afternoon gets buried.",
    severity: "warning",
    solution: "Automated routing ensures every lead is acknowledged instantly, 24/7",
    tier: "Growth",
  },
];

const followUpProblems: Problem[] = [
  {
    id: "no-follow-up",
    title: "No systematic follow-up process",
    description:
      "Most sales require 5-12 touchpoints. If you're not following up systematically, you're leaving the majority of potential revenue on the table.",
    severity: "critical",
    solution: "Automated follow-up sequences: WhatsApp reminders, email nurture, scheduled callbacks",
    tier: "Growth",
  },
  {
    id: "forgotten-leads",
    title: "Leads get forgotten after first contact",
    description:
      "Your team tries to follow up but with no system, hot leads from last week slip through. Consistency is impossible without automation.",
    severity: "warning",
    solution: "CRM with automated reminders and task assignment so no lead is ever forgotten",
    tier: "Growth",
  },
  {
    id: "no-nurture",
    title: "No nurture for leads who aren't ready yet",
    description:
      "Not every lead buys immediately. Without a nurture system, leads that aren't ready today simply disappear. They were qualified — they just needed more time.",
    severity: "warning",
    solution: "Automated drip sequences that keep your brand top-of-mind until they're ready to buy",
    tier: "Premium",
  },
  {
    id: "one-shot-sales",
    title: "One-shot selling — buy or move on",
    description:
      "If every lead gets exactly one shot and you move on, you're throwing away potential revenue. The best sales teams nurture, re-engage, and persist.",
    severity: "critical",
    solution: "Full end-to-end pipeline: capture → qualify → nurture → convert → retain",
    tier: "Premium",
  },
];

/* ── Impact statements ──────────────────────────────── */

const impactStatements = [
  "A system that responds in under 60 seconds contacts 3-5× more leads while they're still hot",
  "Automated follow-ups increase conversion from first contact by 40-60%",
  "Centralizing all channels into one CRM eliminates 15-25% lead leakage",
  "Businesses with automated lead capture report 2-3× more qualified pipeline within 90 days",
];

/* ── Main scoring function ───────────────────────────── */

export function diagnose(answers: Answers): Result {
  let score = 0;
  const problems: Problem[] = [];

  // ── Channel analysis ──
  const hasWebsite = answers.channels.includes("Website form");
  const hasWhatsApp = answers.channels.includes("WhatsApp");
  const channelCount = answers.channels.length;
  const hasFewChannels = channelCount <= 2;

  if (!hasWebsite) {
    problems.push(channelProblems[0]); // no-website-form
    score += 20;
  }

  if (hasWhatsApp) {
    problems.push(channelProblems[1]); // no-whatsapp
    score += 10;
  }

  if (channelCount >= 4) {
    problems.push(channelProblems[2]); // scattered-channels
    score += 15;
  }

  if (hasFewChannels && !hasWebsite) {
    problems.push(channelProblems[3]); // no-automation
    score += 20;
  }

  // ── Response time analysis ──
  const responseScore = responseTimeScore[answers.responseTime];
  score += responseScore;

  if (responseScore >= 25) {
    problems.push(responseProblems[0]); // slow-response
  }
  if (responseScore >= 15) {
    problems.push(responseProblems[1]); // no-speed-system
  }

  // ── Follow-up analysis ──
  const fuScore = followUpScore[answers.followUp];
  score += fuScore;

  if (answers.followUp === "move-on") {
    problems.push(followUpProblems[3]); // one-shot-sales
  }
  if (answers.followUp === "leave-to-them") {
    problems.push(followUpProblems[0]); // no-follow-up
  }
  if (answers.followUp === "try-but-forget") {
    problems.push(followUpProblems[1]); // forgotten-leads
    problems.push(followUpProblems[2]); // no-nurture
  }
  if (answers.followUp === "move-on") {
    problems.push(followUpProblems[2]); // no-nurture
  }

  // Cap at 100
  score = Math.min(100, score);

  // ── Determine severity ──
  let severity: Result["severity"];
  let severityColor: string;

  if (score <= 30) {
    severity = "Low leakage";
    severityColor = "text-green-400";
  } else if (score <= 60) {
    severity = "Moderate leakage";
    severityColor = "text-amber-400";
  } else {
    severity = "Critical leakage";
    severityColor = "text-red-400";
  }

  // ── Pick relevant impact statements ──
  const impact: string[] = [];
  if (responseScore >= 15) impact.push(impactStatements[0]);
  if (fuScore >= 15) impact.push(impactStatements[1]);
  if (channelCount >= 4) impact.push(impactStatements[2]);
  if (score >= 40) impact.push(impactStatements[3]);
  if (impact.length === 0) impact.push(impactStatements[3]); // always at least one

  return { score, severity, severityColor, problems, impact };
}
