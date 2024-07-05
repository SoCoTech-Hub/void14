import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  BadgeManualAwardId,
  badgeManualAwardIdSchema,
  badgeManualAwards,
  insertBadgeManualAwardSchema,
  NewBadgeManualAwardParams,
  UpdateBadgeManualAwardParams,
  updateBadgeManualAwardSchema,
} from "../../db/schema/badgeManualAwards";

export const createBadgeManualAward = async (
  badgeManualAward: NewBadgeManualAwardParams,
) => {
  const newBadgeManualAward =
    insertBadgeManualAwardSchema.parse(badgeManualAward);
  try {
    const [b] = await db
      .insert(badgeManualAwards)
      .values(newBadgeManualAward)
      .returning();
    return { badgeManualAward: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeManualAward = async (
  id: BadgeManualAwardId,
  badgeManualAward: UpdateBadgeManualAwardParams,
) => {
  const { id: badgeManualAwardId } = badgeManualAwardIdSchema.parse({ id });
  const newBadgeManualAward =
    updateBadgeManualAwardSchema.parse(badgeManualAward);
  try {
    const [b] = await db
      .update(badgeManualAwards)
      .set(newBadgeManualAward)
      .where(eq(badgeManualAwards.id, badgeManualAwardId!))
      .returning();
    return { badgeManualAward: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeManualAward = async (id: BadgeManualAwardId) => {
  const { id: badgeManualAwardId } = badgeManualAwardIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(badgeManualAwards)
      .where(eq(badgeManualAwards.id, badgeManualAwardId!))
      .returning();
    return { badgeManualAward: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
