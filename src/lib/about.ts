export interface PrincipleItem {
  title: string;
  description: string;
  icon: "Sparkles" | "BadgeCheck" | "Lightbulb" | "RefreshCw";
}

export interface AudienceItem {
  title: string;
  description: string;
  icon: "Code2" | "Palette" | "Lightbulb" | "Building2";
}

export interface ApproachStep {
  number: string;
  title: string;
  description: string;
  icon: "Search" | "PenTool" | "Code2" | "TrendingUp";
}

export interface NeutralStat {
  title: string;
  subtitle: string;
  icon: "Cpu" | "Blocks" | "Code2" | "Globe2";
}

export const PHILOSOPHY_PRINCIPLES: PrincipleItem[] = [
  {
    title: "Simplicity",
    description:
      "We believe good products should be easy to understand, use, and customize.",
    icon: "Sparkles",
  },
  {
    title: "Quality",
    description:
      "We focus on clean design, thoughtful architecture, and reliable implementation.",
    icon: "BadgeCheck",
  },
  {
    title: "Practicality",
    description:
      "We build solutions that solve real problems rather than adding unnecessary complexity.",
    icon: "Lightbulb",
  },
  {
    title: "Continuous Improvement",
    description:
      "We continuously improve our products based on technology, feedback, and real-world use.",
    icon: "RefreshCw",
  },
];

export const AUDIENCE_ITEMS: AudienceItem[] = [
  {
    title: "Developers",
    description: "Tools and starter kits that help developers move faster.",
    icon: "Code2",
  },
  {
    title: "Designers",
    description: "UI resources and templates for creating better interfaces.",
    icon: "Palette",
  },
  {
    title: "Creators",
    description: "Digital resources that help turn ideas into products.",
    icon: "Lightbulb",
  },
  {
    title: "Businesses",
    description: "Custom digital solutions built around real business needs.",
    icon: "Building2",
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    number: "01",
    title: "Understand",
    description:
      "We start by understanding the problem, goals, and requirements.",
    icon: "Search",
  },
  {
    number: "02",
    title: "Design",
    description: "We create a clear structure and user experience.",
    icon: "PenTool",
  },
  {
    number: "03",
    title: "Build",
    description: "We develop the solution using modern technologies.",
    icon: "Code2",
  },
  {
    number: "04",
    title: "Improve",
    description: "We test, optimize, and continuously improve the result.",
    icon: "TrendingUp",
  },
];

export const NEUTRAL_STATS: NeutralStat[] = [
  {
    title: "Modern Stack",
    subtitle: "Next.js 16 & TypeScript",
    icon: "Cpu",
  },
  {
    title: "Reusable Components",
    subtitle: "Tailwind & shadcn/ui",
    icon: "Blocks",
  },
  {
    title: "Developer Focused",
    subtitle: "Clean & modular codebases",
    icon: "Code2",
  },
  {
    title: "Built for the Web",
    subtitle: "High performance & accessible",
    icon: "Globe2",
  },
];

export const BENTO_STATEMENTS = [
  {
    title: "Less repetitive work.",
    description:
      "Stop recreating standard auth, layouts, and data schemas from scratch for every project.",
  },
  {
    title: "Better developer experience.",
    description:
      "Strict TypeScript typings, organized folder hierarchies, and intuitive component APIs.",
  },
  {
    title: "Cleaner interfaces.",
    description:
      "Minimalist, modern dark aesthetics with purposeful spacing and subtle micro-interactions.",
  },
  {
    title: "Faster product development.",
    description:
      "Go from initial idea to working production MVP in days rather than months.",
  },
  {
    title: "Scalable foundations.",
    description:
      "Solid architectural patterns built to support real user growth without breaking.",
  },
  {
    title: "Useful digital resources.",
    description:
      "Production-ready design tokens, icon sets, and UI starter kits you actually need.",
  },
];
