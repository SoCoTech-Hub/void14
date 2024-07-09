import type {
  BadgeExternalBackpackId,
  NewBadgeExternalBackpackParams,
  UpdateBadgeExternalBackpackParams,
} from "@soco/badge-db/schema/badgeExternalBackpacks";
import { db, eq } from "@soco/badge-db";
import {
  badgeExternalBackpackIdSchema,
  badgeExternalBackpacks,
  insertBadgeExternalBackpackSchema,
  updateBadgeExternalBackpackSchema,
} from "@soco/badge-db/schema/badgeExternalBackpacks";

export const createBadgeExternalBackpack = async (
  badgeExternalBackpack: NewBadgeExternalBackpackParams,
) => {
  const newBadgeExternalBackpack = insertBadgeExternalBackpackSchema.parse(
    badgeExternalBackpack,
  );
  try {
    const [b] = await db
      .insert(badgeExternalBackpacks)
      .values(newBadgeExternalBackpack)
      .returning();
    return { badgeExternalBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeExternalBackpack = async (
  id: BadgeExternalBackpackId,
  badgeExternalBackpack: UpdateBadgeExternalBackpackParams,
) => {
  const { id: badgeExternalBackpackId } = badgeExternalBackpackIdSchema.parse({
    id,
  });
  const newBadgeExternalBackpack = updateBadgeExternalBackpackSchema.parse(
    badgeExternalBackpack,
  );
  try {
    const [b] = await db
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

export const deleteBadgeExternalBackpack = async (
  id: BadgeExternalBackpackId,
) => {
  const { id: badgeExternalBackpackId } = badgeExternalBackpackIdSchema.parse({
    id,
  });
  try {
    const [b] = await db
      .delete(badgeExternalBackpacks)
      .where(eq(badgeExternalBackpacks.id, badgeExternalBackpackId!))
      .returning();
    return { badgeExternalBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
