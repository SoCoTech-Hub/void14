import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BadgeAlignmentId, 
  type NewBadgeAlignmentParams,
  type UpdateBadgeAlignmentParams, 
  updateBadgeAlignmentSchema,
  insertBadgeAlignmentSchema, 
  badgeAlignments,
  badgeAlignmentIdSchema 
} from "@/lib/db/schema/badgeAlignments";

export const createBadgeAlignment = async (badgeAlignment: NewBadgeAlignmentParams) => {
  const newBadgeAlignment = insertBadgeAlignmentSchema.parse(badgeAlignment);
  try {
    const [b] =  await db.insert(badgeAlignments).values(newBadgeAlignment).returning();
    return { badgeAlignment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeAlignment = async (id: BadgeAlignmentId, badgeAlignment: UpdateBadgeAlignmentParams) => {
  const { id: badgeAlignmentId } = badgeAlignmentIdSchema.parse({ id });
  const newBadgeAlignment = updateBadgeAlignmentSchema.parse(badgeAlignment);
  try {
    const [b] =  await db
     .update(badgeAlignments)
     .set(newBadgeAlignment)
     .where(eq(badgeAlignments.id, badgeAlignmentId!))
     .returning();
    return { badgeAlignment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeAlignment = async (id: BadgeAlignmentId) => {
  const { id: badgeAlignmentId } = badgeAlignmentIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeAlignments).where(eq(badgeAlignments.id, badgeAlignmentId!))
    .returning();
    return { badgeAlignment: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

