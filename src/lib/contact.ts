export interface ContactHelpOption {
  id: string;
  label: string;
}

export interface NextStepItem {
  number: string;
  title: string;
  description: string;
  icon: "MessageSquare" | "Search" | "ArrowRight";
}

export interface QuickHelpCard {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: "Package" | "Code2" | "CircleHelp";
}

export const HELP_OPTIONS: ContactHelpOption[] = [
  { id: "digital-product", label: "Digital Product Question" },
  { id: "product-support", label: "Product Support" },
  { id: "web-dev", label: "Web Development" },
  { id: "backend-api", label: "Backend & API Development" },
  { id: "ecommerce", label: "E-commerce Development" },
  { id: "frontend-ui", label: "Frontend & UI Development" },
  { id: "maintenance", label: "Website Maintenance" },
  { id: "general", label: "General Question" },
];

export const NEXT_STEPS: NextStepItem[] = [
  {
    number: "01",
    title: "Tell Us",
    description: "Share your question, product issue, or project requirements.",
    icon: "MessageSquare",
  },
  {
    number: "02",
    title: "We Review",
    description: "We'll review your message and understand what you need.",
    icon: "Search",
  },
  {
    number: "03",
    title: "We Connect",
    description: "We'll discuss the next steps and the best way to move forward.",
    icon: "ArrowRight",
  },
];

export const QUICK_HELP_ITEMS: QuickHelpCard[] = [
  {
    title: "Browse Products",
    description: "Looking for a ready-made digital product?",
    cta: "Explore Products",
    href: "/products",
    icon: "Package",
  },
  {
    title: "Need Custom Development?",
    description: "Have something specific you want built?",
    cta: "View Services",
    href: "/services",
    icon: "Code2",
  },
  {
    title: "Have a General Question?",
    description: "Find quick answers to common questions.",
    cta: "View FAQ",
    href: "/#faq",
    icon: "CircleHelp",
  },
];
