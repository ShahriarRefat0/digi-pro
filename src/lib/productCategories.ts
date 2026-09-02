export interface ProductCategoryConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon:
    | "Globe2"
    | "PanelsTopLeft"
    | "Rocket"
    | "Code2"
    | "ShoppingCart"
    | "Blocks"
    | "Sparkles"
    | "Palette"
    | "Box"
    | "Clapperboard"
    | "Smartphone"
    | "Zap"
    | "BookOpen"
    | "Layers3";
  productCount: string;
  color: string;
}

export const PRODUCT_CATEGORIES_CONFIG: ProductCategoryConfig[] = [
  {
    id: "web-templates",
    name: "Web Templates",
    slug: "web-templates",
    description: "Ready-to-use website templates for modern projects.",
    icon: "Globe2",
    productCount: "12+ Templates",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "ui-kits",
    name: "UI Kits",
    slug: "ui-kits",
    description: "Production-ready interfaces and design systems.",
    icon: "PanelsTopLeft",
    productCount: "8+ Packs",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "saas-starters",
    name: "SaaS Starters",
    slug: "saas-starters",
    description: "Launch-ready foundations for SaaS applications.",
    icon: "Rocket",
    productCount: "15+ Starters",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    slug: "developer-tools",
    description: "Tools and utilities built for modern developers.",
    icon: "Code2",
    productCount: "10+ Tools",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    slug: "e-commerce",
    description: "Storefronts and components for online businesses.",
    icon: "ShoppingCart",
    productCount: "7+ Stores",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "web-components",
    name: "Web Components",
    slug: "web-components",
    description: "Reusable components for modern web applications.",
    icon: "Blocks",
    productCount: "25+ Components",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "ai-tools",
    name: "AI Tools",
    slug: "ai-tools",
    description: "AI-powered tools, templates, and integrations.",
    icon: "Sparkles",
    productCount: "9+ Tools",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: "design-assets",
    name: "Design Assets",
    slug: "design-assets",
    description: "Creative resources for digital designers.",
    icon: "Palette",
    productCount: "18+ Assets",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    id: "3d-assets",
    name: "3D Assets",
    slug: "3d-assets",
    description: "3D models, illustrations, and visual assets.",
    icon: "Box",
    productCount: "14+ Models",
    color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  },
  {
    id: "motion-animation",
    name: "Motion & Animation",
    slug: "motion-animation",
    description: "Animated assets and motion components for the web.",
    icon: "Clapperboard",
    productCount: "11+ Packs",
    color: "text-fuchsia-400 bg-fuchsia-500/10 border-fuchsia-500/20",
  },
  {
    id: "mobile-ui",
    name: "Mobile UI",
    slug: "mobile-ui",
    description: "Modern interfaces and components for mobile products.",
    icon: "Smartphone",
    productCount: "8+ Kits",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
  {
    id: "productivity",
    name: "Productivity",
    slug: "productivity",
    description: "Templates and tools that improve digital workflows.",
    icon: "Zap",
    productCount: "12+ Tools",
    color: "text-lime-400 bg-lime-500/10 border-lime-500/20",
  },
  {
    id: "ebooks-guides",
    name: "E-books & Guides",
    slug: "ebooks-guides",
    description: "Practical guides, tutorials, and development resources.",
    icon: "BookOpen",
    productCount: "6+ Guides",
    color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  },
  {
    id: "digital-assets",
    name: "Digital Assets",
    slug: "digital-assets",
    description: "Useful digital resources for creators and developers.",
    icon: "Layers3",
    productCount: "20+ Packs",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
];

export const OFFICIAL_PRODUCT_CATEGORY_NAMES = [
  "Web Templates",
  "UI Kits",
  "SaaS Starters",
  "Developer Tools",
  "E-commerce",
  "Web Components",
  "AI Tools",
  "Design Assets",
  "3D Assets",
  "Motion & Animation",
  "Mobile UI",
  "Productivity",
  "E-books & Guides",
  "Digital Assets",
] as const;

export type OfficialProductCategoryName = (typeof OFFICIAL_PRODUCT_CATEGORY_NAMES)[number];
