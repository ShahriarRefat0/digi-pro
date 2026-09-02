export interface ServiceCategoryConfig {
  id: string;
  name: string;
  slug: string;
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

export const SERVICE_CATEGORIES_CONFIG: ServiceCategoryConfig[] = [
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    description: "Modern websites and web applications built with React and Next.js.",
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
    name: "UI/UX Development",
    slug: "ui-ux-development",
    description: "Responsive interfaces converted from designs into production-ready applications.",
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
    name: "E-commerce Development",
    slug: "ecommerce-development",
    description: "Modern storefronts and e-commerce experiences.",
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
    name: "API & Backend Development",
    slug: "backend-api-development",
    description: "Reliable APIs, databases, and backend systems.",
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
    name: "AI Integration",
    slug: "ai-integration",
    description: "AI-powered features and integrations for modern applications.",
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
    name: "Website Optimization",
    slug: "website-optimization",
    description: "Performance, responsiveness, and UI improvements for existing websites.",
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
