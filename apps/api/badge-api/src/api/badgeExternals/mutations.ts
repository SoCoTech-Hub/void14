import type {
  BadgeExternalId,
  NewBadgeExternalParams,
  UpdateBadgeExternalParams,
} from "@soco/badge-db/schema/badgeExternals";
import { eq } from "@soco/badge-db";
import { db } from "@soco/badge-db/client";
import {
  badgeExternalIdSchema,
  badgeExternals,
  insertBadgeExternalSchema,
  updateBadgeExternalSchema,
} from "@soco/badge-db/schema/badgeExternals";

export const createBadgeExternal = async (
  badgeExternal: NewBadgeExternalParams,
) => {
  const newBadgeExternal = insertBadgeExternalSchema.parse(badgeExternal);
  try {
    const [b] = await db
      .insert(badgeExternals)
      .values(newBadgeExternal)
      .returning();
    return { badgeExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeExternal = async (
  id: BadgeExternalId,
  badgeExternal: UpdateBadgeExternalParams,
) => {
  const { id: badgeExternalId } = badgeExternalIdSchema.parse({ id });
  const newBadgeExternal = updateBadgeExternalSchema.parse(badgeExternal);
  try {
    const [b] = await db
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
    const [b] = await db
      .delete(badgeExternals)
      .where(eq(badgeExternals.id, badgeExternalId!))
      .returning();
    return { badgeExternal: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
