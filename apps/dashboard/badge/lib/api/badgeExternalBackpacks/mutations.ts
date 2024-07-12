import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type BadgeExternalBackpackId, 
  type NewBadgeExternalBackpackParams,
  type UpdateBadgeExternalBackpackParams, 
  updateBadgeExternalBackpackSchema,
  insertBadgeExternalBackpackSchema, 
  badgeExternalBackpacks,
  badgeExternalBackpackIdSchema 
} from "@/lib/db/schema/badgeExternalBackpacks";

export const createBadgeExternalBackpack = async (badgeExternalBackpack: NewBadgeExternalBackpackParams) => {
  const newBadgeExternalBackpack = insertBadgeExternalBackpackSchema.parse(badgeExternalBackpack);
  try {
    const [b] =  await db.insert(badgeExternalBackpacks).values(newBadgeExternalBackpack).returning();
    return { badgeExternalBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeExternalBackpack = async (id: BadgeExternalBackpackId, badgeExternalBackpack: UpdateBadgeExternalBackpackParams) => {
  const { id: badgeExternalBackpackId } = badgeExternalBackpackIdSchema.parse({ id });
  const newBadgeExternalBackpack = updateBadgeExternalBackpackSchema.parse(badgeExternalBackpack);
  try {
    const [b] =  await db
     .update(badgeExternalBackpacks)
     .set(newBadgeExternalBackpack)
     .where(eq(badgeExternalBackpacks.id, badgeExternalBackpackId!))
     .returning();
    return { badgeExternalBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeExternalBackpack = async (id: BadgeExternalBackpackId) => {
  const { id: badgeExternalBackpackId } = badgeExternalBackpackIdSchema.parse({ id });
  try {
    const [b] =  await db.delete(badgeExternalBackpacks).where(eq(badgeExternalBackpacks.id, badgeExternalBackpackId!))
    .returning();
    return { badgeExternalBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

