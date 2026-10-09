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
    id: "baby-essentials",
    name: "Baby Essentials",
    slug: "Baby Essentials",
    description: "Dermatologist-tested skincare, gentle baby lotion, and daily care essentials.",
    icon: "Sparkles",
    productCount: "45+ Products",
    color: "text-[#7C9473] bg-[#FAF7F0] border-[#7C9473]/30",
  },
  {
    id: "maternal-care",
    name: "Maternal Care",
    slug: "Maternal Care",
    description: "Pregnancy comfort, stretch mark oils, and nursing care for mothers.",
    icon: "Zap",
    productCount: "30+ Products",
    color: "text-[#29332D] bg-[#F3E1DD] border-[#F3E1DD]",
  },
  {
    id: "feeding-nursing",
    name: "Feeding & Nursing",
    slug: "Maternal Care",
    description: "BPA-free bottles, nursing pads, and essential feeding accessories.",
    icon: "Rocket",
    productCount: "25+ Products",
    color: "text-[#7C9473] bg-[#F0F4EE] border-[#7C9473]/30",
  },
  {
    id: "bath-skincare",
    name: "Bath & Skincare",
    slug: "Baby Essentials",
    description: "Tear-free baby washes, moisturizing balms, and organic oils.",
    icon: "Palette",
    productCount: "20+ Products",
    color: "text-amber-700 bg-amber-50 border-amber-200",
  },
  {
    id: "diapering-wipes",
    name: "Diapering & Wipes",
    slug: "Baby Essentials",
    description: "Hypoallergenic wipes, rash creams, and organic cotton diapers.",
    icon: "ShoppingCart",
    productCount: "18+ Products",
    color: "text-[#7C9473] bg-[#FAF7F0] border-[#7C9473]/30",
  },
  {
    id: "postpartum-recovery",
    name: "Postpartum Recovery",
    slug: "Maternal Care",
    description: "Gentle healing balms, support belts, and maternal recovery items.",
    icon: "BookOpen",
    productCount: "15+ Products",
    color: "text-rose-700 bg-rose-50 border-rose-200",
  },
];

export const OFFICIAL_PRODUCT_CATEGORY_NAMES = [
  "Baby Essentials",
  "Maternal Care",
] as const;

export type OfficialProductCategoryName = (typeof OFFICIAL_PRODUCT_CATEGORY_NAMES)[number];
