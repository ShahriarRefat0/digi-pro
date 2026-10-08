import { StaticPageItem } from "@/types/search";

export const STATIC_PAGES: StaticPageItem[] = [
  {
    id: "products-page",
    title: "Discover Products",
    description: "Browse dermatologist-approved maternal and baby care products.",
    href: "/products",
    keywords: ["products", "discover", "baby care", "mother care", "skincare", "lotion", "wipes", "essentials", "shop", "store"],
    icon: "Package",
  },
  {
    id: "care-journal-page",
    title: "Care Journal",
    description: "Trusted guidance, baby care tips, and product guides for mothers and caregivers.",
    href: "/care-journal",
    keywords: ["journal", "care journal", "articles", "baby care", "newborn", "postpartum", "diaper rash", "mother care", "tips", "guides"],
    icon: "FileText",
  },
  {
    id: "about-page",
    title: "About Careproff",
    description: "Learn about our commitment to safe, gentle maternal and baby care products.",
    href: "/about",
    keywords: ["about", "story", "team", "mission", "company", "careproff", "safety guarantee"],
    icon: "Compass",
  },
  {
    id: "contact-page",
    title: "Contact & Support",
    description: "Get in touch with Careproff support for orders, delivery, or product advice.",
    href: "/contact",
    keywords: ["contact", "support", "help", "inquiry", "message", "email", "reach out", "faqs"],
    icon: "MessageSquare",
  },
];
