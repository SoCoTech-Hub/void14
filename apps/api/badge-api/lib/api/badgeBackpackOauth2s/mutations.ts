import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  BadgeBackpackOauth2Id,
  badgeBackpackOauth2IdSchema,
  badgeBackpackOauth2s,
  insertBadgeBackpackOauth2Schema,
  NewBadgeBackpackOauth2Params,
  UpdateBadgeBackpackOauth2Params,
  updateBadgeBackpackOauth2Schema,
} from "../db/schema/badgeBackpackOauth2s";

export const createBadgeBackpackOauth2 = async (
  badgeBackpackOauth2: NewBadgeBackpackOauth2Params,
) => {
  const { session } = await getUserAuth();
  const newBadgeBackpackOauth2 = insertBadgeBackpackOauth2Schema.parse({
    ...badgeBackpackOauth2,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(badgeBackpackOauth2s)
      .values(newBadgeBackpackOauth2)
      .returning();
    return { badgeBackpackOauth2: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeBackpackOauth2 = async (
  id: BadgeBackpackOauth2Id,
  badgeBackpackOauth2: UpdateBadgeBackpackOauth2Params,
) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackOauth2Id } = badgeBackpackOauth2IdSchema.parse({
    id,
  });
  const newBadgeBackpackOauth2 = updateBadgeBackpackOauth2Schema.parse({
    ...badgeBackpackOauth2,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(badgeBackpackOauth2s)
      .set({ ...newBadgeBackpackOauth2, updatedAt: new Date() })
      .where(
        and(
          eq(badgeBackpackOauth2s.id, badgeBackpackOauth2Id!),
          eq(badgeBackpackOauth2s.userId, session?.user.id!),
        ),
      )
      .returning();
    return { badgeBackpackOauth2: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeBackpackOauth2 = async (id: BadgeBackpackOauth2Id) => {
  const { session } = await getUserAuth();
  const { id: badgeBackpackOauth2Id } = badgeBackpackOauth2IdSchema.parse({
    id,
  });
  try {
    const [b] = await db
      .delete(badgeBackpackOauth2s)
      .where(
        and(
          eq(badgeBackpackOauth2s.id, badgeBackpackOauth2Id!),
          eq(badgeBackpackOauth2s.userId, session?.user.id!),
        ),
      )
      .returning();
    return { badgeBackpackOauth2: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
