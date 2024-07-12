import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BadgeEndorsementId, 
  type NewBadgeEndorsementParams,
  type UpdateBadgeEndorsementParams, 
  updateBadgeEndorsementSchema,
  insertBadgeEndorsementSchema, 
  badgeEndorsements,
  badgeEndorsementIdSchema 
} from "@/lib/db/schema/badgeEndorsements";

export const createBadgeEndorsement = async (badgeEndorsement: NewBadgeEndorsementParams) => {
  const newBadgeEndorsement = insertBadgeEndorsementSchema.parse(badgeEndorsement);
  try {
    const [b] =  await db.insert(badgeEndorsements).values(newBadgeEndorsement).returning();
    return { badgeEndorsement: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeEndorsement = async (id: BadgeEndorsementId, badgeEndorsement: UpdateBadgeEndorsementParams) => {
  const { id: badgeEndorsementId } = badgeEndorsementIdSchema.parse({ id });
  const newBadgeEndorsement = updateBadgeEndorsementSchema.parse(badgeEndorsement);
  try {
    const [b] =  await db
     .update(badgeEndorsements)
     .set({...newBadgeEndorsement, updatedAt: new Date() })
     .where(eq(badgeEndorsements.id, badgeEndorsementId!))
     .returning();
    return { badgeEndorsement: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeEndorsement = async (id: BadgeEndorsementId) => {
  const { id: badgeEndorsementId } = badgeEndorsementIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeEndorsements).where(eq(badgeEndorsements.id, badgeEndorsementId!))
    .returning();
    return { badgeEndorsement: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

