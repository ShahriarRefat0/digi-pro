import { StaticPageItem } from "@/types/search";

export const STATIC_PAGES: StaticPageItem[] = [
  {
    id: "products-page",
    title: "Products & Assets",
    description: "Browse curated digital products, UI kits, templates, and developer boilerplates.",
    href: "/products",
    keywords: ["products", "discover", "templates", "ui kits", "starter kits", "assets", "boilerplates", "downloads", "shop", "store"],
    icon: "Package",
  },
  {
    id: "services-page",
    title: "Custom Services",
    description: "Full-stack development, Next.js engineering, custom APIs, and website maintenance.",
    href: "/services",
    keywords: ["services", "development", "freelance", "custom", "consulting", "engineering", "hire", "web development", "api"],
    icon: "Code2",
  },
  {
    id: "blog-page",
    title: "Engineering Blog",
    description: "In-depth guides, architectural patterns, and practical Next.js and React tutorials.",
    href: "/blog",
    keywords: ["blog", "articles", "tutorials", "guides", "news", "learn", "posts", "engineering"],
    icon: "FileText",
  },
  {
    id: "about-page",
    title: "About DigiForge",
    description: "Learn about our mission to provide high quality digital assets and engineering excellence.",
    href: "/about",
    keywords: ["about", "story", "team", "mission", "company", "vision", "creator"],
    icon: "Compass",
  },
  {
    id: "contact-page",
    title: "Contact & Inquiries",
    description: "Get in touch with us for custom project inquiries, partnerships, or support.",
    href: "/contact",
    keywords: ["contact", "support", "help", "inquiry", "message", "email", "reach out", "hire"],
    icon: "MessageSquare",
  },
];
