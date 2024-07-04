import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  BadgeBackpackId,
  badgeBackpackIdSchema,
  badgeBackpacks,
  insertBadgeBackpackSchema,
  NewBadgeBackpackParams,
  UpdateBadgeBackpackParams,
  updateBadgeBackpackSchema,
} from "../db/schema/badgeBackpacks";

export const createBadgeBackpack = async (
  badgeBackpack: NewBadgeBackpackParams,
) => {
  const { session } = await getUserAuth();
  const newBadgeBackpack = insertBadgeBackpackSchema.parse({
    ...badgeBackpack,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(badgeBackpacks)
      .values(newBadgeBackpack)
      .returning();
    return { badgeBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeBackpack = async (
  id: BadgeBackpackId,
  badgeBackpack: UpdateBadgeBackpackParams,
) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackId } = badgeBackpackIdSchema.parse({ id });
  const newBadgeBackpack = updateBadgeBackpackSchema.parse({
    ...badgeBackpack,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(badgeBackpacks)
      .set(newBadgeBackpack)
      .where(
        and(
          eq(badgeBackpacks.id, badgeBackpackId!),
          eq(badgeBackpacks.userId, session?.user.id!),
        ),
      )
      .returning();
    return { badgeBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeBackpack = async (id: BadgeBackpackId) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackId } = badgeBackpackIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(badgeBackpacks)
      .where(
        and(
          eq(badgeBackpacks.id, badgeBackpackId!),
          eq(badgeBackpacks.userId, session?.user.id!),
        ),
      )
      .returning();
    return { badgeBackpack: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
