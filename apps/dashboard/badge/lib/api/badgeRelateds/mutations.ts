import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BadgeRelatedId, 
  type NewBadgeRelatedParams,
  type UpdateBadgeRelatedParams, 
  updateBadgeRelatedSchema,
  insertBadgeRelatedSchema, 
  badgeRelateds,
  badgeRelatedIdSchema 
} from "@/lib/db/schema/badgeRelateds";

export const createBadgeRelated = async (badgeRelated: NewBadgeRelatedParams) => {
  const newBadgeRelated = insertBadgeRelatedSchema.parse(badgeRelated);
  try {
    const [b] =  await db.insert(badgeRelateds).values(newBadgeRelated).returning();
    return { badgeRelated: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeRelated = async (id: BadgeRelatedId, badgeRelated: UpdateBadgeRelatedParams) => {
  const { id: badgeRelatedId } = badgeRelatedIdSchema.parse({ id });
  const newBadgeRelated = updateBadgeRelatedSchema.parse(badgeRelated);
  try {
    const [b] =  await db
     .update(badgeRelateds)
     .set(newBadgeRelated)
     .where(eq(badgeRelateds.id, badgeRelatedId!))
     .returning();
    return { badgeRelated: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeRelated = async (id: BadgeRelatedId) => {
  const { id: badgeRelatedId } = badgeRelatedIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeRelateds).where(eq(badgeRelateds.id, badgeRelatedId!))
    .returning();
    return { badgeRelated: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

