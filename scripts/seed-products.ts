import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const INITIAL_SEED_PRODUCTS = [
  {
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
    included: ["Source Code", "Figma Design System", "Free Lifetime Updates", "Documentation"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    requirements: ["Node.js 20+", "pnpm 9+"],
    demoUrl: "https://nextforge.demo",
    documentationUrl: "https://docs.nextforge.dev",
    purchaseUrl: "https://gumroad.com/l/nextforge",
    version: "1.0.0",
    status: "published",
    featured: true,
    tags: ["nextjs", "saas", "boilerplate", "typescript"],
    createdAt: new Date(Date.now() - 3600 * 1000 * 2),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 2),
  },
  {
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
    included: ["NestJS Boilerplate", "Postman / Swagger Collections", "Docker Compose Config", "Unit Tests"],
    technologies: ["NestJS", "TypeScript", "MongoDB", "Mongoose", "Docker"],
    requirements: ["Node.js 20+", "MongoDB 6+"],
    demoUrl: "https://api.neststack.demo",
    documentationUrl: "https://docs.neststack.dev",
    purchaseUrl: "https://gumroad.com/l/neststack",
    version: "1.2.0",
    status: "published",
    featured: true,
    tags: ["nestjs", "backend", "api", "mongodb"],
    createdAt: new Date(Date.now() - 3600 * 1000 * 24),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 24),
  },
  {
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
    included: ["Full Admin UI", "shadcn/ui Custom Theme", "Responsive Layouts"],
    technologies: ["React 19", "Next.js", "Tailwind CSS", "shadcn/ui"],
    requirements: ["Node.js 18+"],
    demoUrl: "https://adminpro.demo",
    documentationUrl: "https://docs.adminpro.dev",
    purchaseUrl: "https://gumroad.com/l/adminpro",
    version: "0.9.0",
    status: "draft",
    featured: false,
    tags: ["dashboard", "admin", "template", "tailwind"],
    createdAt: new Date(Date.now() - 3600 * 1000 * 48),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 48),
  },
  {
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
    included: ["Storefront Code", "Product Detail Layout", "Category Nav System"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    requirements: ["Node.js 20+"],
    demoUrl: "https://commercekit.demo",
    documentationUrl: "https://docs.commercekit.dev",
    purchaseUrl: "https://gumroad.com/l/commercekit",
    version: "1.1.0",
    status: "published",
    featured: true,
    tags: ["ecommerce", "storefront", "digital-products", "nextjs"],
    createdAt: new Date(Date.now() - 3600 * 1000 * 72),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 72),
  },
];

async function seedProducts() {
  const uri = process.env.DATA_BASE_URL;
  if (!uri) {
    console.error("❌ Error: DATA_BASE_URL is not defined in .env");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB for product seeding.");

    const db = client.db("digipro_store");
    const productsCollection = db.collection("products");

    const existingCount = await productsCollection.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ️ Products collection already contains ${existingCount} products. Skipping initial seed.`);
      return;
    }

    await productsCollection.insertMany(INITIAL_SEED_PRODUCTS);
    console.log(`✅ Successfully seeded ${INITIAL_SEED_PRODUCTS.length} initial products into MongoDB.`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedProducts();
