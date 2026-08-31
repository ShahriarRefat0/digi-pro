export interface DigitalCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: string;
  icon:
    | "LayoutTemplate"
    | "PanelsTopLeft"
    | "Rocket"
    | "Code2"
    | "ShoppingCart"
    | "Palette"
    | "Zap"
    | "BookOpen";
  color: string;
}

export const DIGITAL_CATEGORIES: DigitalCategory[] = [
  {
    id: "website-templates",
    name: "Website Templates",
    slug: "website-templates",
    description: "Modern website and landing page templates ready to customize.",
    productCount: "12+ Products",
    icon: "LayoutTemplate",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: "ui-kits",
    name: "UI Kits",
    slug: "ui-kits",
    description:
      "Reusable UI components and design systems for modern digital products.",
    productCount: "8+ Packs",
    icon: "PanelsTopLeft",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    id: "starter-kits",
    name: "Starter Kits",
    slug: "starter-kits",
    description:
      "Ready-to-use project foundations that help you start building faster.",
    productCount: "15+ Kits",
    icon: "Rocket",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "developer-tools",
    name: "Developer Tools",
    slug: "developer-tools",
    description: "Developer resources, boilerplates, utilities, and tools.",
    productCount: "10+ Tools",
    icon: "Code2",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    slug: "e-commerce",
    description: "Templates and resources for building modern online stores.",
    productCount: "7+ Products",
    icon: "ShoppingCart",
    color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
  {
    id: "design-assets",
    name: "Design Assets",
    slug: "design-assets",
    description: "Figma kits, graphics, illustrations, and creative resources.",
    productCount: "18+ Assets",
    icon: "Palette",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    id: "productivity",
    name: "Productivity",
    slug: "productivity",
    description: "Templates and tools designed to help you work smarter.",
    productCount: "9+ Resources",
    icon: "Zap",
    color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  {
    id: "ebooks-guides",
    name: "E-books & Guides",
    slug: "ebooks-guides",
    description:
      "Practical books, guides, and resources for learning and building.",
    productCount: "6+ Guides",
    icon: "BookOpen",
    color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
  },
];
