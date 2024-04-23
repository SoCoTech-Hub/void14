import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  BadgeExternalId, 
  NewBadgeExternalParams,
  UpdateBadgeExternalParams, 
  updateBadgeExternalSchema,
  insertBadgeExternalSchema, 
  badgeExternals,
  badgeExternalIdSchema 
} from "@/lib/db/schema/badgeExternals";

export const createBadgeExternal = async (badgeExternal: NewBadgeExternalParams) => {
  const newBadgeExternal = insertBadgeExternalSchema.parse(badgeExternal);
  try {
    const [b] =  await db.insert(badgeExternals).values(newBadgeExternal).returning();
    return { badgeExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeExternal = async (id: BadgeExternalId, badgeExternal: UpdateBadgeExternalParams) => {
  const { id: badgeExternalId } = badgeExternalIdSchema.parse({ id });
  const newBadgeExternal = updateBadgeExternalSchema.parse(badgeExternal);
  try {
    const [b] =  await db
     .update(badgeExternals)
     .set(newBadgeExternal)
     .where(eq(badgeExternals.id, badgeExternalId!))
     .returning();
    return { badgeExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeExternal = async (id: BadgeExternalId) => {
  const { id: badgeExternalId } = badgeExternalIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeExternals).where(eq(badgeExternals.id, badgeExternalId!))
    .returning();
    return { badgeExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

