export type Project = {
  id: string;
  name: string;
  domain: string;
  type: string;
  visitors: number;
  delta: number;
  outcome: string;
  outcomeValue: number;
  status: "healthy" | "warning";
  spark: number[];
};

export type AttentionItem = {
  id: string;
  project: string;
  tone: "positive" | "neutral" | "warning";
  title: string;
  detail: string;
  evidence: string[];
  time: string;
};

export type Release = {
  id: string;
  project: string;
  title: string;
  time: string;
  status: "measuring" | "complete";
  effect: string;
  metrics: { label: string; value: string; delta: string }[];
};

export const projects: Project[] = [
  {
    id: "mentionloom",
    name: "Mentionloom",
    domain: "mentionloom.com",
    type: "SaaS",
    visitors: 1248,
    delta: 18.4,
    outcome: "Signups",
    outcomeValue: 86,
    status: "healthy",
    spark: [34, 39, 37, 46, 43, 51, 48, 58, 62, 74, 69, 83, 91, 96],
  },
  {
    id: "portfolio",
    name: "Portfolio",
    domain: "giovanitier.com",
    type: "Portfolio",
    visitors: 814,
    delta: 31.2,
    outcome: "Contact intent",
    outcomeValue: 42,
    status: "healthy",
    spark: [28, 26, 31, 34, 42, 38, 48, 44, 61, 58, 64, 72, 77, 88],
  },
  {
    id: "syntari",
    name: "SyntariUI",
    domain: "syntariui.giovanitier.com",
    type: "Open source",
    visitors: 466,
    delta: 9.7,
    outcome: "GitHub clicks",
    outcomeValue: 67,
    status: "healthy",
    spark: [22, 29, 25, 31, 36, 34, 43, 39, 49, 53, 48, 61, 65, 70],
  },
  {
    id: "linkedout",
    name: "LinkedOut",
    domain: "linkedout.fun",
    type: "Experiment",
    visitors: 212,
    delta: -6.8,
    outcome: "Shares",
    outcomeValue: 23,
    status: "warning",
    spark: [52, 49, 55, 47, 44, 46, 41, 39, 42, 36, 35, 33, 31, 29],
  },
];

export const attention: AttentionItem[] = [
  {
    id: "a1",
    project: "Mentionloom",
    tone: "positive",
    title: "Signup conversion increased after the pricing rewrite.",
    detail: "Visitors reaching /pricing are converting 17% better than the previous 7-day baseline.",
    evidence: ["Pricing rewrite · Sep 29", "+38% visits to /signup", "+17% signup conversion"],
    time: "42 min ago",
  },
  {
    id: "a2",
    project: "Portfolio",
    tone: "positive",
    title: "A design community is sending unusually qualified traffic.",
    detail: "Traffic is 2.1× normal, and contact-intent events are growing faster than pageviews.",
    evidence: ["184 visits from one referrer", "12 contact-intent events", "Avg. depth 3.8 pages"],
    time: "1h ago",
  },
  {
    id: "a3",
    project: "SyntariUI",
    tone: "neutral",
    title: "Docs traffic is becoming the main path to GitHub.",
    detail: "The docs → GitHub journey now drives 61% of repository clicks.",
    evidence: ["67 GitHub clicks", "41 originated in docs", "README traffic flat"],
    time: "Today",
  },
  {
    id: "a4",
    project: "LinkedOut",
    tone: "warning",
    title: "Tracking volume dropped after the last deployment.",
    detail: "Page events are down 68% while the site remains reachable. Verify the tracker is still installed.",
    evidence: ["Last healthy event 7h ago", "Domain reachable", "Collector has no errors"],
    time: "7h ago",
  },
];

export const releases: Release[] = [
  {
    id: "r1",
    project: "Mentionloom",
    title: "Pricing page rewrite",
    time: "Sep 29 · 14:32",
    status: "complete",
    effect: "Clear positive signal",
    metrics: [
      { label: "Pricing visits", value: "642", delta: "+38%" },
      { label: "Signup conversion", value: "8.4%", delta: "+17%" },
      { label: "Signups", value: "54", delta: "+21%" },
    ],
  },
  {
    id: "r2",
    project: "Portfolio",
    title: "Factorial case study polish",
    time: "Sep 28 · 19:10",
    status: "complete",
    effect: "More qualified sessions",
    metrics: [
      { label: "Case study reads", value: "284", delta: "+44%" },
      { label: "Completion", value: "61%", delta: "+12%" },
      { label: "Contact intent", value: "18", delta: "+29%" },
    ],
  },
  {
    id: "r3",
    project: "SyntariUI",
    title: "Installation docs",
    time: "Sep 26 · 11:45",
    status: "measuring",
    effect: "Still measuring",
    metrics: [
      { label: "Docs visits", value: "312", delta: "+22%" },
      { label: "GitHub clicks", value: "67", delta: "+9%" },
      { label: "Return visits", value: "84", delta: "+14%" },
    ],
  },
];

export const activity = [
  ["Mentionloom", "signup_completed", "/signup", "Spain", "now"],
  ["Portfolio", "contact_clicked", "/factorial", "United States", "1m"],
  ["Mentionloom", "pricing_viewed", "/pricing", "United Kingdom", "2m"],
  ["SyntariUI", "github_clicked", "/docs/install", "Germany", "3m"],
  ["Portfolio", "case_study_completed", "/billionhands", "Netherlands", "5m"],
  ["Mentionloom", "report_started", "/", "Brazil", "7m"],
];
