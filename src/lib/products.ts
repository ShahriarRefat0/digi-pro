export type ProductCategory =
  | "Website Templates"
  | "UI Kits"
  | "Starter Kits"
  | "Developer Tools"
  | "E-commerce"
  | "Design Assets"
  | "Productivity"
  | "E-books & Guides";

export type ProductStatus = "published" | "draft" | "archived";

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  category: ProductCategory;
  thumbnail: string;
  images: string[];
  features: string[];
  technologies: string[];
  requirements: string[];
  demoUrl?: string;
  documentationUrl?: string;
  purchaseUrl?: string;
  version: string;
  status: ProductStatus;
  featured: boolean;
  updatedAt: string;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Website Templates",
  "UI Kits",
  "Starter Kits",
  "Developer Tools",
  "E-commerce",
  "Design Assets",
  "Productivity",
  "E-books & Guides",
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "nextforge",
    name: "NextForge",
    slug: "nextforge",
    shortDescription: "Production-ready Next.js 16 SaaS boilerplate with authentication and modular architecture.",
    description: "NextForge is the definitive SaaS boilerplate engineered for modern software founders and developer teams. Includes end-to-end type safety, modern routing, dark mode UI, and preconfigured developer scripts.",
    price: 49,
    category: "Starter Kits",
    thumbnail: "/images/products/nextforge.png",
    images: [],
    features: [
      "Next.js 16 App Router",
      "TypeScript & Tailwind CSS v4",
      "Modular Component System",
      "SEO Metadata Generator",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    requirements: ["Node.js 20+", "pnpm 9+"],
    demoUrl: "https://nextforge.demo",
    documentationUrl: "https://docs.nextforge.dev",
    purchaseUrl: "https://gumroad.com/l/nextforge",
    version: "1.0.0",
    status: "published",
    featured: true,
    updatedAt: "2 hours ago",
  },
  {
    id: "neststack",
    name: "NestStack",
    slug: "neststack",
    shortDescription: "Enterprise-grade NestJS REST API kit with MongoDB Mongoose schemas and clean architecture.",
    description: "Architectural backend starter kit built on NestJS and MongoDB. Features modular domain driven design, validation pipes, JWT handling, and Swagger OpenAPI documentation.",
    price: 59,
    category: "Developer Tools",
    thumbnail: "/images/products/neststack.png",
    images: [],
    features: [
      "Domain Driven Architecture",
      "MongoDB & Mongoose Models",
      "JWT Authentication Middleware",
      "Automated Swagger API Docs",
    ],
    technologies: ["NestJS", "TypeScript", "MongoDB", "Mongoose", "Docker"],
    requirements: ["Node.js 20+", "MongoDB 6+"],
    demoUrl: "https://api.neststack.demo",
    documentationUrl: "https://docs.neststack.dev",
    purchaseUrl: "https://gumroad.com/l/neststack",
    version: "1.2.0",
    status: "published",
    featured: true,
    updatedAt: "Yesterday",
  },
  {
    id: "adminpro",
    name: "AdminPro",
    slug: "adminpro",
    shortDescription: "High-density admin template with interactive data tables, metrics cards, and dark theme.",
    description: "Modern administrative dashboard template featuring custom widgets, accessible data tables, filtering controls, and responsive navigation for SaaS backoffices.",
    price: 39,
    category: "Website Templates",
    thumbnail: "/images/products/adminpro.png",
    images: [],
    features: [
      "Interactive Data Tables",
      "Status Filter System",
      "Mobile Drawer Navigation",
      "Accessible shadcn primitives",
    ],
    technologies: ["React 19", "Next.js", "Tailwind CSS", "shadcn/ui"],
    requirements: ["Node.js 18+"],
    demoUrl: "https://adminpro.demo",
    documentationUrl: "https://docs.adminpro.dev",
    purchaseUrl: "https://gumroad.com/l/adminpro",
    version: "0.9.0",
    status: "draft",
    featured: false,
    updatedAt: "2 days ago",
  },
  {
    id: "commercekit",
    name: "CommerceKit",
    slug: "commercekit",
    shortDescription: "Minimalist digital goods storefront with product filtering, carousels, and responsive checkout UI.",
    description: "Comprehensive e-commerce foundation for creators selling digital downloads, software templates, and e-books. Features clean category tabs, quick view modals, and search.",
    price: 69,
    category: "E-commerce",
    thumbnail: "/images/products/commercekit.png",
    images: [],
    features: [
      "Digital Download Architecture",
      "Faceted Search & Filters",
      "Category Carousel Controls",
      "Zero-latency Turbopack",
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    requirements: ["Node.js 20+"],
    demoUrl: "https://commercekit.demo",
    documentationUrl: "https://docs.commercekit.dev",
    purchaseUrl: "https://gumroad.com/l/commercekit",
    version: "1.1.0",
    status: "published",
    featured: true,
    updatedAt: "3 days ago",
  },
];
