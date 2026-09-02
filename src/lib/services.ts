export * from "./serviceCategories";

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon:
    | "Code2"
    | "PanelsTopLeft"
    | "ShoppingCart"
    | "Server"
    | "BrainCircuit"
    | "Gauge";
  features: string[];
  technologies: string[];
  cta: string;
}

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
  icon: "MessageSquare" | "Code2" | "Rocket";
}

export interface TechnologyItem {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "UI & Styling";
  description: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    slug: "web-development",
    title: "Web Development",
    description:
      "Modern websites and web applications built with React and Next.js.",
    icon: "Code2",
    features: [
      "Custom Next.js & React web applications",
      "High-converting landing pages & marketing sites",
      "Full-stack architecture & performance optimization",
      "Clean TypeScript code with modular design",
      "Fully responsive and mobile-optimized layouts",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    cta: "Start Project",
  },
  {
    id: "ui-ux-development",
    slug: "ui-ux-development",
    title: "UI/UX Development",
    description:
      "Responsive interfaces converted from designs into production-ready applications.",
    icon: "PanelsTopLeft",
    features: [
      "Figma design to production code translation",
      "Interactive UI component libraries & design systems",
      "Smooth micro-interactions & fluid animations",
      "Accessible ARIA compliance & clean state handling",
      "Dark mode & custom theming systems",
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Motion", "shadcn/ui"],
    cta: "Learn More",
  },
  {
    id: "ecommerce-development",
    slug: "ecommerce-development",
    title: "E-commerce Development",
    description:
      "Modern storefronts and e-commerce experiences.",
    icon: "ShoppingCart",
    features: [
      "Digital downloads & physical product storefronts",
      "Stripe, LemonSqueezy & payment integrations",
      "Shopping cart, checkout flows & customer portals",
      "Inventory & order management dashboards",
      "SEO-optimized product catalog pages",
    ],
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe"],
    cta: "Build Store",
  },
  {
    id: "backend-api-development",
    slug: "backend-api-development",
    title: "API & Backend Development",
    description:
      "Reliable APIs, databases, and backend systems.",
    icon: "Server",
    features: [
      "Scalable RESTful APIs & Route Handlers",
      "Database schema design & MongoDB aggregation",
      "Secure JWT / Session authentication & RBAC",
      "Webhook processing & third-party integrations",
      "Comprehensive API documentation & testing",
    ],
    technologies: ["Node.js", "NestJS", "MongoDB", "TypeScript"],
    cta: "Discuss API",
  },
  {
    id: "ai-integration",
    slug: "ai-integration",
    title: "AI Integration",
    description:
      "AI-powered features and integrations for modern applications.",
    icon: "BrainCircuit",
    features: [
      "LLM & Gemini / OpenAI API integrations",
      "Streaming chat, completions & multimodal models",
      "Structured output, function calling & AI agents",
      "Embeddings & semantic vector search",
      "Intelligent workflow automation",
    ],
    technologies: ["Gemini API", "OpenAI", "Next.js", "TypeScript"],
    cta: "Integrate AI",
  },
  {
    id: "website-optimization",
    slug: "website-optimization",
    title: "Website Optimization",
    description:
      "Performance, responsiveness, and UI improvements for existing websites.",
    icon: "Gauge",
    features: [
      "Core Web Vitals & Google Lighthouse optimization",
      "Bundle size reduction & code-splitting audits",
      "Bug fixing & legacy codebase refactoring",
      "SEO enhancements & structured data",
      "Cross-browser & mobile viewport fixes",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    cta: "Optimize Website",
  },
];

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    number: "01",
    title: "Discuss",
    description:
      "Tell me about your idea, requirements, or existing project to define the scope and timeline.",
    icon: "MessageSquare",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Design and development using modern technologies, clean architecture, and regular updates.",
    icon: "Code2",
  },
  {
    number: "03",
    title: "Deliver",
    description:
      "Test, optimize, and deliver a reliable, production-ready solution ready to launch.",
    icon: "Rocket",
  },
];

export const TECHNOLOGIES_DATA: TechnologyItem[] = [
  {
    name: "Next.js",
    category: "Frontend",
    description: "App Router, SSR, Server Components",
  },
  {
    name: "React",
    category: "Frontend",
    description: "Component architecture & hooks",
  },
  {
    name: "TypeScript",
    category: "Frontend",
    description: "End-to-end type safety",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "High-performance runtime",
  },
  {
    name: "NestJS",
    category: "Backend",
    description: "Modular enterprise architecture",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Flexible document database",
  },
  {
    name: "Tailwind CSS",
    category: "UI & Styling",
    description: "Utility-first modern styling",
  },
  {
    name: "shadcn/ui",
    category: "UI & Styling",
    description: "Accessible component system",
  },
];
