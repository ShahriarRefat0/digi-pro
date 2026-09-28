import { ObjectId, Filter } from "mongodb";
import { getDatabase } from "@/lib/mongodb";
import {
  HeroSlide,
  HeroSlideDocument,
  CreateHeroSlideInput,
  UpdateHeroSlideInput,
} from "@/types/hero";

const HERO_COLLECTION = "hero_slides";

let indexesEnsured = false;

export async function ensureHeroIndexes(): Promise<void> {
  if (indexesEnsured) return;
  try {
    const db = await getDatabase();
    const col = db.collection<HeroSlideDocument>(HERO_COLLECTION);
    await Promise.allSettled([
      col.createIndex({ isActive: 1, order: 1 }),
      col.createIndex({ order: 1 }),
      col.createIndex({ createdAt: -1 }),
    ]);
    indexesEnsured = true;
  } catch (err) {
    console.error("Error creating hero slide indexes in MongoDB:", err);
  }
}

function serializeHeroSlide(doc: HeroSlideDocument): HeroSlide {
  const startDateStr = doc.startDate
    ? doc.startDate instanceof Date
      ? doc.startDate.toISOString()
      : new Date(doc.startDate).toISOString()
    : null;

  const endDateStr = doc.endDate
    ? doc.endDate instanceof Date
      ? doc.endDate.toISOString()
      : new Date(doc.endDate).toISOString()
    : null;

  return {
    id: doc._id ? doc._id.toString() : "",
    eyebrow: doc.eyebrow || "",
    title: doc.title || "",
    description: doc.description || "",
    desktopImage: doc.desktopImage || { url: "", key: "" },
    mobileImage: doc.mobileImage || { url: "", key: "" },
    primaryButton: doc.primaryButton || { enabled: true, text: "Shop Now", link: "/products" },
    secondaryButton: doc.secondaryButton || { enabled: false, text: "Learn More", link: "/about" },
    order: typeof doc.order === "number" ? doc.order : 1,
    isActive: Boolean(doc.isActive),
    startDate: startDateStr,
    endDate: endDateStr,
    createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
  };
}

/**
 * Fetch active, schedule-valid hero slides sorted by `order ASC` for public rendering
 */
export async function getActiveHeroSlides(): Promise<HeroSlide[]> {
  try {
    await ensureHeroIndexes();
    const db = await getDatabase();
    const now = new Date();

    const filter: Filter<HeroSlideDocument> = {
      isActive: true,
      $and: [
        {
          $or: [
            { startDate: { $exists: false } },
            { startDate: null },
            { startDate: { $lte: now } },
          ],
        },
        {
          $or: [
            { endDate: { $exists: false } },
            { endDate: null },
            { endDate: { $gte: now } },
          ],
        },
      ],
    };

    const docs = await db
      .collection<HeroSlideDocument>(HERO_COLLECTION)
      .find(filter)
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return docs.map(serializeHeroSlide);
  } catch (error) {
    console.error("Error fetching active hero slides from MongoDB:", error);
    return [];
  }
}

/**
 * Fetch all hero slides (for Admin Dashboard) sorted by `order ASC`
 */
export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    await ensureHeroIndexes();
    const db = await getDatabase();
    const docs = await db
      .collection<HeroSlideDocument>(HERO_COLLECTION)
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();

    return docs.map(serializeHeroSlide);
  } catch (error) {
    console.error("Error fetching all hero slides from MongoDB:", error);
    return [];
  }
}

/**
 * Fetch a single hero slide by ID
 */
export async function getHeroSlideById(id: string): Promise<HeroSlide | null> {
  if (!id || !ObjectId.isValid(id)) return null;
  try {
    const db = await getDatabase();
    const doc = await db
      .collection<HeroSlideDocument>(HERO_COLLECTION)
      .findOne({ _id: new ObjectId(id) });

    if (!doc) return null;
    return serializeHeroSlide(doc);
  } catch (error) {
    console.error(`Error fetching hero slide by ID (${id}):`, error);
    return null;
  }
}

/**
 * Create a new hero slide in MongoDB
 */
export async function createHeroSlide(input: CreateHeroSlideInput): Promise<HeroSlide> {
  await ensureHeroIndexes();
  const db = await getDatabase();
  const now = new Date();

  // If order is not specified, assign next max order
  let orderToUse = input.order;
  if (orderToUse === undefined || orderToUse === null) {
    const last = await db
      .collection<HeroSlideDocument>(HERO_COLLECTION)
      .find({})
      .sort({ order: -1 })
      .limit(1)
      .toArray();
    orderToUse = last.length > 0 ? (last[0].order || 0) + 1 : 1;
  }

  const newDoc: HeroSlideDocument = {
    eyebrow: (input.eyebrow || "").trim(),
    title: input.title.trim(),
    description: (input.description || "").trim(),
    desktopImage: input.desktopImage,
    mobileImage: input.mobileImage,
    primaryButton: {
      enabled: Boolean(input.primaryButton?.enabled),
      text: (input.primaryButton?.text || "Shop Now").trim(),
      link: (input.primaryButton?.link || "/products").trim(),
    },
    secondaryButton: {
      enabled: Boolean(input.secondaryButton?.enabled),
      text: (input.secondaryButton?.text || "Learn More").trim(),
      link: (input.secondaryButton?.link || "/about").trim(),
    },
    order: orderToUse,
    isActive: input.isActive !== undefined ? Boolean(input.isActive) : true,
    startDate: input.startDate ? new Date(input.startDate) : null,
    endDate: input.endDate ? new Date(input.endDate) : null,
    createdAt: now,
    updatedAt: now,
  };

  const result = await db
    .collection<HeroSlideDocument>(HERO_COLLECTION)
    .insertOne(newDoc);

  return serializeHeroSlide({ ...newDoc, _id: result.insertedId });
}

/**
 * Update an existing hero slide in MongoDB
 */
export async function updateHeroSlide(
  id: string,
  input: UpdateHeroSlideInput
): Promise<HeroSlide | null> {
  if (!id || !ObjectId.isValid(id)) return null;
  await ensureHeroIndexes();
  const db = await getDatabase();

  const updateData: Partial<HeroSlideDocument> = {
    updatedAt: new Date(),
  };

  if (input.eyebrow !== undefined) updateData.eyebrow = input.eyebrow.trim();
  if (input.title !== undefined) updateData.title = input.title.trim();
  if (input.description !== undefined) updateData.description = input.description.trim();
  if (input.desktopImage !== undefined) updateData.desktopImage = input.desktopImage;
  if (input.mobileImage !== undefined) updateData.mobileImage = input.mobileImage;
  if (input.primaryButton !== undefined) {
    updateData.primaryButton = {
      enabled: Boolean(input.primaryButton.enabled),
      text: input.primaryButton.text.trim(),
      link: input.primaryButton.link.trim(),
    };
  }
  if (input.secondaryButton !== undefined) {
    updateData.secondaryButton = {
      enabled: Boolean(input.secondaryButton.enabled),
      text: input.secondaryButton.text.trim(),
      link: input.secondaryButton.link.trim(),
    };
  }
  if (input.order !== undefined) updateData.order = input.order;
  if (input.isActive !== undefined) updateData.isActive = Boolean(input.isActive);
  if (input.startDate !== undefined) {
    updateData.startDate = input.startDate ? new Date(input.startDate) : null;
  }
  if (input.endDate !== undefined) {
    updateData.endDate = input.endDate ? new Date(input.endDate) : null;
  }

  const result = await db
    .collection<HeroSlideDocument>(HERO_COLLECTION)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" }
    );

  if (!result) return null;
  return serializeHeroSlide(result as HeroSlideDocument);
}

/**
 * Delete a hero slide by ID
 */
export async function deleteHeroSlide(id: string): Promise<boolean> {
  if (!id || !ObjectId.isValid(id)) return false;
  try {
    const db = await getDatabase();
    const result = await db
      .collection<HeroSlideDocument>(HERO_COLLECTION)
      .deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error(`Error deleting hero slide (${id}):`, error);
    return false;
  }
}

/**
 * Toggle hero slide active/inactive state
 */
export async function toggleHeroSlide(id: string): Promise<HeroSlide | null> {
  const current = await getHeroSlideById(id);
  if (!current) return null;
  return updateHeroSlide(id, { isActive: !current.isActive });
}

/**
 * Reorder hero slides by updating order based on array index
 */
export async function reorderHeroSlides(orderedIds: string[]): Promise<boolean> {
  if (!orderedIds || orderedIds.length === 0) return true;
  try {
    const db = await getDatabase();
    const col = db.collection<HeroSlideDocument>(HERO_COLLECTION);

    const bulkOps = orderedIds
      .filter((id) => ObjectId.isValid(id))
      .map((id, index) => ({
        updateOne: {
          filter: { _id: new ObjectId(id) },
          update: { $set: { order: index + 1, updatedAt: new Date() } },
        },
      }));

    if (bulkOps.length > 0) {
      await col.bulkWrite(bulkOps);
    }
    return true;
  } catch (error) {
    console.error("Error reordering hero slides:", error);
    return false;
  }
}
