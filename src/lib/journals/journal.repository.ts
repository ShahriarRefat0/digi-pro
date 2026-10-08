import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import { JournalArticle, CreateJournalInput, UpdateJournalInput, JournalCategory } from "@/types/journal";

const JOURNALS_COLLECTION = "journals";

export interface JournalDocument {
  _id?: ObjectId;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: JournalCategory;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  date: string;
  readTime: string;
  featured: boolean;
  status: "published" | "draft";
  tags: string[];
  coverImage: string;
  relatedProductIds?: string[];
  seoTitle?: string;
  seoDescription?: string;
  seoImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

function docToJournal(doc: JournalDocument): JournalArticle {
  return {
    id: doc._id ? doc._id.toString() : "",
    slug: doc.slug,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    category: doc.category,
    author: doc.author,
    authorRole: doc.authorRole,
    authorAvatar: doc.authorAvatar,
    date: doc.date,
    readTime: doc.readTime,
    featured: doc.featured,
    status: doc.status,
    tags: doc.tags || [],
    coverImage: doc.coverImage,
    relatedProductIds: doc.relatedProductIds || [],
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    seoImage: doc.seoImage,
    createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
    updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt.toISOString() : String(doc.updatedAt),
  };
}

// Seed initial articles if collection is empty
const INITIAL_JOURNALS: Array<Omit<JournalDocument, "_id" | "createdAt" | "updatedAt">> = [
  {
    slug: "10-essential-winter-care-tips-for-newborn-babies",
    title: "10 Essential Winter Care Tips for Newborn Babies",
    description: "Simple and practical ways to keep your newborn comfortable, clean, and protected during the colder months.",
    content: `Winter weather brings cold temperatures and dry indoor heating, both of which can affect a newborn's delicate skin and respiratory system. Here are 10 pediatrician-recommended tips to ensure your baby stays cozy, healthy, and warm throughout the winter months.

### 1. Dress in Breathable Layers
Instead of heavy, bulky clothing, layer your baby in soft, breathable cotton clothes. A general rule of thumb is to dress your baby in one more layer than you are wearing yourself.

### 2. Keep Indoor Humidity Balanced
Central heating reduces moisture in the air, causing dry skin and nasal congestion. Using a cool-mist humidifier in the nursery maintains ideal humidity levels between 40% and 60%.

### 3. Protect Delicate Skin with Hydrating Lotion
Cold winds can strip moisture from delicate newborn skin. Apply a gentle, fragrance-free baby lotion or cream immediately after bath time to lock in essential hydration.

### 4. Limit Bath Duration & Water Temperature
Frequent long baths in hot water strip natural oils. Keep bath time under 10 minutes using lukewarm water and a hypoallergenic baby wash.

### 5. Prevent Diaper Area Irritation
Cold weather layers can sometimes trap moisture near the diaper area. Change diapers frequently and apply a protective zinc barrier cream to prevent redness.`,
    category: "Newborn Care",
    author: "Careproff Care Team",
    authorRole: "Pediatric & Maternal Care Experts",
    date: "Sep 28, 2026",
    readTime: "5 min read",
    featured: true,
    status: "published",
    tags: ["Newborn", "Winter Care", "Skin Care", "Baby Health"],
    coverImage: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop",
    relatedProductIds: [],
    seoTitle: "10 Essential Winter Care Tips for Newborns | Careproff",
    seoDescription: "Practical guide for keeping your newborn baby comfortable and healthy during cold winter months.",
  },
  {
    slug: "how-to-prevent-and-care-for-baby-diaper-rash",
    title: "How to Prevent and Care for Baby Diaper Rash",
    description: "Practical everyday tips for keeping your baby's diaper area clean, dry, and comfortable.",
    content: `Diaper rash is one of the most common skin conditions affecting infants during their first two years. Understanding the causes and implementing a gentle care routine can help prevent flare-ups and speed up healing.

### Understanding the Causes
Diaper rash is usually triggered by prolonged exposure to wetness, friction from tight diapers, or sensitivity to fragrance in wet wipes.

### Prevention Steps
- Change diapers promptly after wetness or bowel movements.
- Clean gently with soft, alcohol-free wipes or warm water.
- Allow the skin to air dry completely before putting on a fresh diaper.
- Apply a thick layer of soothing barrier cream containing Zinc Oxide.`,
    category: "Diaper & Rash Care",
    author: "Careproff Care Team",
    authorRole: "Pediatric & Maternal Care Experts",
    date: "Sep 25, 2026",
    readTime: "4 min read",
    featured: false,
    status: "published",
    tags: ["Diaper Rash", "Baby Hygiene", "Skin Care"],
    coverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop",
    relatedProductIds: [],
  },
  {
    slug: "how-to-build-a-simple-baby-skin-care-routine",
    title: "How to Build a Simple Baby Skin Care Routine",
    description: "A gentle guide to everyday skincare for your baby's delicate skin.",
    content: `A newborn's skin is up to 30% thinner than adult skin, making it far more vulnerable to dryness and mild irritation. Creating a minimalist, gentle routine protects their natural moisture barrier.

### Keep It Simple
- Cleanse with dermatologically tested, tear-free body wash.
- Moisturize daily with hypoallergenic lotion.
- Protect exposed cheeks from wind and harsh weather.`,
    category: "Baby Skin Care",
    author: "Careproff Care Team",
    authorRole: "Dermatologist Approved Guidance",
    date: "Sep 22, 2026",
    readTime: "4 min read",
    featured: false,
    status: "published",
    tags: ["Skin Care", "Baby Lotion", "Gentle Care"],
    coverImage: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop",
  },
  {
    slug: "newborn-bath-time-a-simple-guide-for-parents",
    title: "Newborn Bath Time: A Simple Guide for Parents",
    description: "Learn how to make bath time comfortable, safe, and stress-free for both baby and parents.",
    content: `Bath time is a special bonding experience between parents and their baby. Following simple safety steps makes the process smooth and enjoyable.

### Bath Time Essentials
1. Test water temperature with your inner wrist (aim for 37°C / 98.6°F).
2. Gather towels, washcloths, and fresh clothes beforehand.
3. Gently cradle your baby's neck and shoulders at all times.`,
    category: "Baby Bath & Hygiene",
    author: "Careproff Care Team",
    authorRole: "Pediatric & Maternal Care Experts",
    date: "Sep 18, 2026",
    readTime: "6 min read",
    featured: false,
    status: "published",
    tags: ["Bath Time", "Hygiene", "Newborn"],
    coverImage: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    slug: "essential-self-care-tips-for-new-mothers",
    title: "Essential Self-Care Tips for New Mothers",
    description: "Simple ways new mothers can make time for rest, comfort, and personal care during early motherhood.",
    content: `Taking care of a newborn requires tremendous physical and emotional energy. Caring for yourself is an essential part of caring for your baby.

### Practical Self-Care Ideas
- Rest whenever your baby sleeps.
- Stay hydrated with water and warm nourishing teas.
- Accept help with household chores from family and friends.
- Dedicate 15 minutes a day for a warm bath or quiet reading.`,
    category: "Mother Care",
    author: "Careproff Care Team",
    authorRole: "Maternal Wellness Specialists",
    date: "Sep 14, 2026",
    readTime: "5 min read",
    featured: false,
    status: "published",
    tags: ["Mother Care", "Self Care", "Wellness"],
    coverImage: "https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    slug: "understanding-postpartum-care-what-new-mothers-should-know",
    title: "Understanding Postpartum Care: What New Mothers Should Know",
    description: "Helpful information for navigating everyday postpartum care and physical recovery.",
    content: `The postpartum period (fourth trimester) involves significant physical recovery and emotional adjustment. Prioritizing rest, nutrition, and pelvic floor wellness ensures a smoother transition into motherhood.`,
    category: "Postpartum Care",
    author: "Careproff Care Team",
    authorRole: "Maternal Health Guidance",
    date: "Sep 10, 2026",
    readTime: "7 min read",
    featured: false,
    status: "published",
    tags: ["Postpartum", "Mother Health", "Recovery"],
    coverImage: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop",
  },
  {
    slug: "how-to-choose-the-right-baby-moisturizer",
    title: "How to Choose the Right Baby Moisturizer",
    description: "Important things parents should consider when choosing skincare products for babies.",
    content: `With so many baby moisturizers on store shelves, finding the right option requires checking ingredients, checking for pediatric approval, and selecting fragrance-free formulas.`,
    category: "Product Guides",
    author: "Careproff Care Team",
    authorRole: "Product Safety Experts",
    date: "Sep 05, 2026",
    readTime: "4 min read",
    featured: false,
    status: "published",
    tags: ["Product Guide", "Baby Lotion", "Ingredients"],
    coverImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop",
  },
  {
    slug: "building-a-practical-newborn-care-kit",
    title: "Building a Practical Newborn Care Kit",
    description: "Essential items every parent can consider for the first weeks with a newborn.",
    content: `Preparing a newborn care kit ensures you have all daily essentials within arm's reach. Include gentle wipes, barrier cream, organic cotton swaddles, a nail trimmer, and a gentle body wash.`,
    category: "Newborn Care",
    author: "Careproff Care Team",
    authorRole: "Pediatric & Maternal Care Experts",
    date: "Aug 29, 2026",
    readTime: "5 min read",
    featured: false,
    status: "published",
    tags: ["Newborn Kit", "Essentials", "Parenting"],
    coverImage: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop",
  },
];

export async function ensureJournalsSeeded(): Promise<void> {
  try {
    const db = await getDatabase();
    const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);
    const count = await col.countDocuments();
    if (count === 0) {
      const docsToInsert = INITIAL_JOURNALS.map((j) => ({
        ...j,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
      await col.insertMany(docsToInsert as any);
    }
  } catch (err) {
    console.error("Error seeding initial journals:", err);
  }
}

export async function getPublishedJournals(): Promise<JournalArticle[]> {
  await ensureJournalsSeeded();
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);
  const docs = await col
    .find({ status: "published" })
    .sort({ createdAt: -1 })
    .toArray();
  return docs.map(docToJournal);
}

export async function getAllJournalsAdmin(): Promise<JournalArticle[]> {
  await ensureJournalsSeeded();
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);
  const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
  return docs.map(docToJournal);
}

export async function getFeaturedJournal(): Promise<JournalArticle | null> {
  await ensureJournalsSeeded();
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);

  // Check for manually featured article
  let doc = await col.findOne({ status: "published", featured: true });

  // Fallback to latest published article
  if (!doc) {
    doc = await col.findOne({ status: "published" }, { sort: { createdAt: -1 } });
  }

  return doc ? docToJournal(doc) : null;
}

export async function getJournalBySlug(slug: string): Promise<JournalArticle | null> {
  await ensureJournalsSeeded();
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);

  let doc = await col.findOne({ slug });
  if (!doc && ObjectId.isValid(slug)) {
    doc = await col.findOne({ _id: new ObjectId(slug) });
  }

  return doc ? docToJournal(doc) : null;
}

export async function createJournal(input: CreateJournalInput): Promise<JournalArticle> {
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);

  const baseSlug = input.slug
    ? input.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
    : input.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const now = new Date();
  const docToInsert: JournalDocument = {
    slug: baseSlug,
    title: input.title.trim(),
    description: input.description.trim(),
    content: input.content.trim(),
    category: input.category || "Baby Care",
    author: input.author ? input.author.trim() : "Careproff Care Team",
    authorRole: input.authorRole ? input.authorRole.trim() : "Pediatric & Maternal Care Experts",
    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    readTime: input.readTime || "5 min read",
    featured: Boolean(input.featured),
    status: input.status || "published",
    tags: input.tags || [],
    coverImage: input.coverImage || "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?q=80&w=1000&auto=format&fit=crop",
    relatedProductIds: input.relatedProductIds || [],
    seoTitle: input.seoTitle,
    seoDescription: input.seoDescription,
    seoImage: input.seoImage,
    createdAt: now,
    updatedAt: now,
  };

  const res = await col.insertOne(docToInsert);
  docToInsert._id = res.insertedId;
  return docToJournal(docToInsert);
}

export async function updateJournal(id: string, input: UpdateJournalInput): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);

  const updateFields: any = {
    updatedAt: new Date(),
  };

  if (input.title !== undefined) updateFields.title = input.title.trim();
  if (input.slug !== undefined) updateFields.slug = input.slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  if (input.description !== undefined) updateFields.description = input.description.trim();
  if (input.content !== undefined) updateFields.content = input.content.trim();
  if (input.category !== undefined) updateFields.category = input.category;
  if (input.author !== undefined) updateFields.author = input.author.trim();
  if (input.authorRole !== undefined) updateFields.authorRole = input.authorRole.trim();
  if (input.readTime !== undefined) updateFields.readTime = input.readTime;
  if (input.featured !== undefined) updateFields.featured = input.featured;
  if (input.status !== undefined) updateFields.status = input.status;
  if (input.tags !== undefined) updateFields.tags = input.tags;
  if (input.coverImage !== undefined) updateFields.coverImage = input.coverImage;
  if (input.relatedProductIds !== undefined) updateFields.relatedProductIds = input.relatedProductIds;
  if (input.seoTitle !== undefined) updateFields.seoTitle = input.seoTitle;
  if (input.seoDescription !== undefined) updateFields.seoDescription = input.seoDescription;
  if (input.seoImage !== undefined) updateFields.seoImage = input.seoImage;

  const res = await col.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
  return res.modifiedCount > 0;
}

export async function deleteJournal(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDatabase();
  const col = db.collection<JournalDocument>(JOURNALS_COLLECTION);
  const res = await col.deleteOne({ _id: new ObjectId(id) });
  return res.deletedCount > 0;
}
