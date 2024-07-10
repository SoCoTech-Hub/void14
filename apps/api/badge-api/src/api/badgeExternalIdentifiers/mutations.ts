import { db } from "@soco/badge-db/client";
import { eq } from "@soco/badge-db";
import { 
  BadgeExternalIdentifierId, 
  NewBadgeExternalIdentifierParams,
  UpdateBadgeExternalIdentifierParams, 
  updateBadgeExternalIdentifierSchema,
  insertBadgeExternalIdentifierSchema, 
  badgeExternalIdentifiers,
  badgeExternalIdentifierIdSchema 
} from "@soco/badge-db/schema/badgeExternalIdentifiers";

export const createBadgeExternalIdentifier = async (badgeExternalIdentifier: NewBadgeExternalIdentifierParams) => {
  const newBadgeExternalIdentifier = insertBadgeExternalIdentifierSchema.parse(badgeExternalIdentifier);
  try {
    const [b] =  await db.insert(badgeExternalIdentifiers).values(newBadgeExternalIdentifier).returning();
    return { badgeExternalIdentifier: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeExternalIdentifier = async (id: BadgeExternalIdentifierId, badgeExternalIdentifier: UpdateBadgeExternalIdentifierParams) => {
  const { id: badgeExternalIdentifierId } = badgeExternalIdentifierIdSchema.parse({ id });
  const newBadgeExternalIdentifier = updateBadgeExternalIdentifierSchema.parse(badgeExternalIdentifier);
  try {
    const [b] =  await db
     .update(badgeExternalIdentifiers)
     .set(newBadgeExternalIdentifier)
     .where(eq(badgeExternalIdentifiers.id, badgeExternalIdentifierId!))
     .returning();
    return { badgeExternalIdentifier: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeExternalIdentifier = async (id: BadgeExternalIdentifierId) => {
  const { id: badgeExternalIdentifierId } = badgeExternalIdentifierIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeExternalIdentifiers).where(eq(badgeExternalIdentifiers.id, badgeExternalIdentifierId!))
    .returning();
    return { badgeExternalIdentifier: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

