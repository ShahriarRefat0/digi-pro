export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: "Globe2" | "Server" | "ShoppingCart" | "PanelsTopLeft" | "Wrench";
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
      "Modern, responsive websites and web applications built with clean and scalable code.",
    icon: "Globe2",
    features: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Custom web applications",
      "Responsive development",
    ],
    technologies: ["Next.js", "React", "TypeScript"],
    cta: "Learn More",
  },
  {
    id: "backend-api-development",
    slug: "backend-api-development",
    title: "Backend & API Development",
    description:
      "Scalable backend systems and APIs designed to power reliable web applications.",
    icon: "Server",
    features: [
      "REST APIs",
      "Authentication",
      "Authorization & RBAC",
      "Database integration",
      "API documentation",
    ],
    technologies: ["Node.js", "NestJS", "MongoDB"],
    cta: "Learn More",
  },
  {
    id: "ecommerce-development",
    slug: "ecommerce-development",
    title: "E-commerce Development",
    description:
      "Modern and scalable e-commerce solutions for businesses that want to sell online.",
    icon: "ShoppingCart",
    features: [
      "Product management",
      "Order management",
      "Admin dashboards",
      "Vendor systems",
      "API & payment integrations",
    ],
    technologies: ["Next.js", "Node.js", "MongoDB"],
    cta: "Learn More",
  },
  {
    id: "frontend-ui-development",
    slug: "frontend-ui-development",
    title: "Frontend & UI Development",
    description:
      "Clean, responsive, and modern interfaces built from designs or product requirements.",
    icon: "PanelsTopLeft",
    features: [
      "Figma to Next.js",
      "Responsive UI",
      "Modern landing pages",
      "Admin dashboards",
      "Reusable components",
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "shadcn/ui"],
    cta: "Learn More",
  },
  {
    id: "website-maintenance-bug-fixing",
    slug: "website-maintenance-bug-fixing",
    title: "Website Maintenance & Bug Fixing",
    description:
      "Keep your existing website fast, stable, updated, and working smoothly.",
    icon: "Wrench",
    features: [
      "Bug fixing",
      "Existing feature updates",
      "API issue fixing",
      "Performance improvements",
      "Small feature additions",
    ],
    technologies: ["Next.js", "React", "Node.js", "MongoDB"],
    cta: "Get Started",
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
