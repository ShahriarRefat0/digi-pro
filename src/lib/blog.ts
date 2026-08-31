export interface ArticleSection {
  heading: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  callout?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category:
    | "Next.js"
    | "Backend"
    | "UI/UX"
    | "Web Development"
    | "E-commerce"
    | "React"
    | "Digital Products"
    | "SaaS";
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  canvasBg: string;
  accentColor: string;
  tableOfContents?: { title: string; id: string }[];
  sections: ArticleSection[];
}

export const BLOG_CATEGORIES = [
  "All",
  "Web Development",
  "Next.js",
  "React",
  "Backend",
  "UI/UX",
  "E-commerce",
  "SaaS",
  "Digital Products",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "how-to-build-a-scalable-nextjs-application",
    title: "How to Build a Scalable Next.js Application in 2026",
    description:
      "A practical guide to structuring a modern Next.js application with reusable components, clean architecture, and scalable patterns.",
    category: "Next.js",
    author: "DigiForge Team",
    authorRole: "Core Architecture Team",
    date: "Aug 28, 2026",
    readTime: "8 min read",
    featured: true,
    tags: ["Next.js", "TypeScript", "Architecture", "Turbopack"],
    canvasBg: "#111827",
    accentColor: "#EEF35F",
    tableOfContents: [
      { id: "introduction", title: "Introduction" },
      { id: "project-structure", title: "Project Structure" },
      { id: "reusable-components", title: "Reusable Components" },
      { id: "server-vs-client", title: "Server and Client Components" },
      { id: "data-fetching", title: "Data Fetching Patterns" },
      { id: "error-handling", title: "Practical Error Handling" },
      { id: "performance", title: "Performance Optimization" },
      { id: "final-thoughts", title: "Final Thoughts" },
    ],
    sections: [
      {
        heading: "Introduction",
        content:
          "Building web applications that survive rapid growth requires discipline in architectural design. As codebases expand with new features, developers frequently encounter spaghetti state management, duplicated API logic, and inconsistent design systems. By leveraging Next.js 16 App Router, React 19 Server Components, and modular boundaries, teams can ship faster while maintaining high velocity.",
      },
      {
        heading: "Project Structure",
        content:
          "A clean folder structure separates domain logic, UI primitives, and application routes. Grouping by feature rather than generic layers prevents circular dependencies and keeps mental context tight.",
        codeSnippet: {
          language: "bash",
          code: `src/
├── app/                  # Next.js App Router routes & layouts
│   ├── (store)/          # Route groups for store pages
│   ├── api/              # API endpoints and webhooks
│   └── globals.css       # Tailwind & theme variables
├── components/           # UI components grouped by feature
│   ├── ui/               # Base primitives (shadcn / Tailwind)
│   ├── navbar/           # Navigation bars
│   └── product/          # Product specific widgets
├── lib/                  # Centralized business logic & data
└── types/                # TypeScript shared contracts`,
        },
        callout:
          "Pro Tip: Use route groups with parentheses e.g. (store) to organize page layouts without mutating the public URL pathname.",
      },
      {
        heading: "Reusable Components",
        content:
          "Component reusability is not just about reducing lines of code; it is about establishing a single source of truth for your design tokens. Every button, badge, modal, and card should consume unified theme tokens and expose strongly typed props.",
      },
      {
        heading: "Server and Client Components",
        content:
          "Next.js App Router defaults to React Server Components. Render static content, databases, and heavy markdown parsing on the server. Push the 'use client' directive only to leaf nodes that require client-side hooks like useState, useEffect, or motion animations.",
        codeSnippet: {
          language: "tsx",
          code: `// Leaf node interactive client component
"use client";

import { motion } from "motion/react";

export function ActionButton({ label }: { label: string }) {
  return (
    <motion.button 
      whileHover={{ scale: 1.05 }} 
      whileTap={{ scale: 0.95 }}
      className="bg-[#EEF35F] text-black font-bold px-6 py-2.5 rounded-full"
    >
      {label}
    </motion.button>
  );
}`,
        },
      },
      {
        heading: "Data Fetching Patterns",
        content:
          "Fetch data directly within Server Components using async/await. Take advantage of automated request deduplication, cache tags, and on-demand revalidation to ensure data freshness without sacrificing TTFB.",
      },
      {
        heading: "Practical Error Handling",
        content:
          "Implement specialized error.tsx and not-found.tsx boundaries at the route level to isolate component failures. This prevents a single broken widget from breaking the entire page.",
      },
      {
        heading: "Performance Optimization",
        content:
          "Leverage next/image for automated WebP/AVIF conversions, dynamic imports with ssr: false for heavy 3D canvases, and streaming with Suspense boundaries for progressive skeleton rendering.",
      },
      {
        heading: "Final Thoughts",
        content:
          "Scalability in Next.js is not an accident—it is the result of intentional structure, type safety, and disciplined separation between server execution and client interactivity. Start with clean foundations, and your app will easily scale to millions of users.",
      },
    ],
  },
  {
    id: "2",
    slug: "building-a-clean-rest-api-with-nestjs",
    title: "Building a Clean REST API with NestJS",
    description:
      "Explore practical patterns for building maintainable and scalable REST APIs with NestJS, TypeScript, and clean architecture.",
    category: "Backend",
    author: "DigiForge Team",
    authorRole: "Backend Engineering",
    date: "Aug 24, 2026",
    readTime: "7 min read",
    tags: ["NestJS", "REST API", "Node.js", "TypeScript"],
    canvasBg: "#1e1b4b",
    accentColor: "#a855f7",
    tableOfContents: [
      { id: "overview", title: "Why NestJS for APIs" },
      { id: "module-architecture", title: "Module Architecture" },
      { id: "dto-validation", title: "DTOs & Request Validation" },
      { id: "dependency-injection", title: "Dependency Injection" },
      { id: "summary", title: "Summary" },
    ],
    sections: [
      {
        heading: "Why NestJS for APIs",
        content:
          "NestJS provides a robust, out-of-the-box application architecture that enables developers to build highly testable, scalable, loosely coupled, and easily maintainable backend services using modern TypeScript.",
      },
      {
        heading: "Module Architecture",
        content:
          "Organizing your controllers, services, and repositories into feature modules keeps backend endpoints encapsulated and easy to unit test.",
        codeSnippet: {
          language: "typescript",
          code: `@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService],
})
export class ProductsModule {}`,
        },
      },
      {
        heading: "DTOs & Request Validation",
        content:
          "Use class-validator and class-transformer with the global ValidationPipe to automatically reject malformed JSON payloads before they hit your service layer.",
      },
      {
        heading: "Dependency Injection",
        content:
          "Nest's IoC container simplifies mocking database connectors and third-party payment gateways during automated test suites.",
      },
      {
        heading: "Summary",
        content:
          "Adopting standard NestJS patterns allows backend teams to build enterprise-grade APIs that remain maintainable across multi-year lifecycles.",
      },
    ],
  },
  {
    id: "3",
    slug: "mongodb-data-modeling-for-modern-applications",
    title: "MongoDB Data Modeling for Modern Applications",
    description:
      "Understand practical MongoDB modeling strategies, embedding vs referencing tradeoffs, and indexing techniques for scalable web apps.",
    category: "Backend",
    author: "DigiForge Team",
    authorRole: "Database Engineering",
    date: "Aug 20, 2026",
    readTime: "6 min read",
    tags: ["MongoDB", "Database", "Backend", "Mongoose"],
    canvasBg: "#064e3b",
    accentColor: "#34d399",
    tableOfContents: [
      { id: "intro", title: "The Flexibility of Document Stores" },
      { id: "embedding-vs-referencing", title: "Embedding vs. Referencing" },
      { id: "indexes", title: "Smart Indexing Strategies" },
      { id: "conclusion", title: "Conclusion" },
    ],
    sections: [
      {
        heading: "The Flexibility of Document Stores",
        content:
          "Document databases allow data structures to evolve alongside application requirements. However, flexibility without schema governance can quickly lead to query bottlenecks.",
      },
      {
        heading: "Embedding vs. Referencing",
        content:
          "As a general rule: Embed data when items are retrieved together and bounded in size (e.g. order line items, product variants). Reference data when sub-documents grow unboundedly or require independent querying.",
        callout:
          "Rule of thumb: Data that changes together and is queried together should live in the same document.",
      },
      {
        heading: "Smart Indexing Strategies",
        content:
          "Always create compound indexes covering your most frequent filter and sort queries. Utilize explain() plans to ensure index-covered queries.",
      },
      {
        heading: "Conclusion",
        content:
          "Thoughtful schema design in MongoDB provides blistering read performance without sacrificing transactional consistency.",
      },
    ],
  },
  {
    id: "4",
    slug: "designing-better-admin-dashboards",
    title: "Designing Better Admin Dashboards",
    description:
      "Practical UI principles for creating clean, useful, and efficient admin dashboards with minimal visual noise.",
    category: "UI/UX",
    author: "DigiForge Team",
    authorRole: "Product Design",
    date: "Aug 17, 2026",
    readTime: "5 min read",
    tags: ["UI", "UX", "Dashboard", "Figma", "Design Systems"],
    canvasBg: "#172554",
    accentColor: "#38bdf8",
    tableOfContents: [
      { id: "visual-hierarchy", title: "Visual Hierarchy & Density" },
      { id: "actionable-metrics", title: "Focus on Actionable Metrics" },
      { id: "table-design", title: "Designing Efficient Data Tables" },
    ],
    sections: [
      {
        heading: "Visual Hierarchy & Density",
        content:
          "Admin users value clarity and scanability over decoration. Use high-contrast typography, strict padding scales, and muted secondary badges to prevent visual fatigue.",
      },
      {
        heading: "Focus on Actionable Metrics",
        content:
          "Don't overwhelm administrators with raw numbers. Highlight percentage deltas, trends, and quick filter toggles that let users resolve issues in fewer clicks.",
      },
      {
        heading: "Designing Efficient Data Tables",
        content:
          "Tables should feature sticky headers, batch actions, compact rows, and pagination controls that preserve filter state across reloads.",
      },
    ],
  },
  {
    id: "5",
    slug: "from-idea-to-mvp-a-practical-development-workflow",
    title: "From Idea to MVP: A Practical Development Workflow",
    description:
      "A simple, battle-tested workflow for turning a product idea into a functional MVP without unnecessary complexity.",
    category: "Web Development",
    author: "DigiForge Team",
    authorRole: "Product & Strategy",
    date: "Aug 12, 2026",
    readTime: "6 min read",
    tags: ["MVP", "Development", "Product", "Strategy"],
    canvasBg: "#3b0764",
    accentColor: "#c084fc",
    tableOfContents: [
      { id: "defining-core-value", title: "Define the Core Value Loop" },
      { id: "stack-selection", title: "Choose a Fast Stack" },
      { id: "ship-and-iterate", title: "Ship Fast & Gather Feedback" },
    ],
    sections: [
      {
        heading: "Define the Core Value Loop",
        content:
          "An MVP must solve exactly one core problem exceptionally well. Cut secondary features until your value proposition is unmistakable.",
      },
      {
        heading: "Choose a Fast Stack",
        content:
          "Use battle-tested tools like Next.js 16, Tailwind CSS, and pre-built digital starter kits to avoid wasting weeks writing boilerplate auth and styling.",
      },
      {
        heading: "Ship Fast & Gather Feedback",
        content:
          "Deploy early, observe real user behavior, and iterate rapidly based on qualitative telemetry rather than speculation.",
      },
    ],
  },
  {
    id: "6",
    slug: "building-a-modern-ecommerce-store-with-nextjs",
    title: "Building a Modern E-commerce Store with Next.js",
    description:
      "Explore the architecture, cart state management, and UI patterns behind a modern online store built with Next.js and Tailwind.",
    category: "E-commerce",
    author: "DigiForge Team",
    authorRole: "E-commerce Engineering",
    date: "Aug 08, 2026",
    readTime: "9 min read",
    tags: ["Next.js", "E-commerce", "MongoDB", "Stripe"],
    canvasBg: "#451a03",
    accentColor: "#fb923c",
    tableOfContents: [
      { id: "store-architecture", title: "Store Architecture" },
      { id: "cart-state", title: "Optimistic Cart State" },
      { id: "checkout-flow", title: "Frictionless Checkout Flow" },
    ],
    sections: [
      {
        heading: "Store Architecture",
        content:
          "E-commerce stores require instant page loads for high SEO conversion. Combining static catalog generation with dynamic server-rendered cart validation delivers the best of both worlds.",
      },
      {
        heading: "Optimistic Cart State",
        content:
          "Update the shopping cart UI instantly upon user clicks, while syncing state with backend sessions in the background to provide a snappy feel.",
      },
      {
        heading: "Frictionless Checkout Flow",
        content:
          "Minimize form fields, support one-click Apple Pay / Google Pay, and provide instant digital download delivery upon payment verification.",
      },
    ],
  },
  {
    id: "7",
    slug: "why-reusable-components-matter-in-modern-react",
    title: "Why Reusable Components Matter in Modern React",
    description:
      "Learn how reusable components improve development speed, design consistency, and team velocity across expanding applications.",
    category: "React",
    author: "DigiForge Team",
    authorRole: "Frontend Architecture",
    date: "Aug 04, 2026",
    readTime: "5 min read",
    tags: ["React", "Components", "Frontend", "Tailwind CSS"],
    canvasBg: "#0c4a6e",
    accentColor: "#38bdf8",
    tableOfContents: [
      { id: "consistency", title: "Design System Consistency" },
      { id: "speed", title: "Compounding Development Speed" },
      { id: "testing", title: "Isolated Unit Testing" },
    ],
    sections: [
      {
        heading: "Design System Consistency",
        content:
          "When core primitives (buttons, modals, cards, inputs) are standardized, entire applications inherit uniform spacing, focus rings, and dark theme variables automatically.",
      },
      {
        heading: "Compounding Development Speed",
        content:
          "Engineers can assemble complete feature pages in hours instead of days by composing tested UI blocks rather than authoring bespoke CSS.",
      },
      {
        heading: "Isolated Unit Testing",
        content:
          "Reusable components can be tested and documented independently in Storybook, ensuring accessibility compliance before hitting production.",
      },
    ],
  },
  {
    id: "8",
    slug: "how-digital-products-help-developers-build-faster",
    title: "How Digital Products Help Developers Build Faster",
    description:
      "Explore how starter kits, UI kits, templates, and 3D icons can reduce engineering cycles and accelerate project launches.",
    category: "Digital Products",
    author: "DigiForge Team",
    authorRole: "Creator Ecosystem",
    date: "Jul 30, 2026",
    readTime: "4 min read",
    tags: ["Digital Products", "Productivity", "Development", "UI Kits"],
    canvasBg: "#1e293b",
    accentColor: "#EEF35F",
    tableOfContents: [
      { id: "leverage", title: "Developer Leverage in 2026" },
      { id: "boilerplate-advantage", title: "The Boilerplate Advantage" },
      { id: "focus-on-unique-value", title: "Focus on Unique Value" },
    ],
    sections: [
      {
        heading: "Developer Leverage in 2026",
        content:
          "Modern software development is about compounding leverage. Starting from a curated, production-ready digital asset saves hundreds of hours of design exploration and boilerplate configuration.",
      },
      {
        heading: "The Boilerplate Advantage",
        content:
          "Premium starter kits provide pre-configured TypeScript schemas, authentication flows, and accessible components, allowing developers to jump directly to building custom business logic.",
      },
      {
        heading: "Focus on Unique Value",
        content:
          "Don't reinvent standard components. Invest your creative energy where your product delivers unique customer value.",
      },
    ],
  },
];

export function getFeaturedArticle(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
}

export function getArticleBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug || p.id === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): BlogPost[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, limit);

  const related = BLOG_POSTS.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  );

  if (related.length < limit) {
    const others = BLOG_POSTS.filter(
      (p) => p.slug !== current.slug && p.category !== current.category
    );
    return [...related, ...others].slice(0, limit);
  }

  return related.slice(0, limit);
}
