import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  BadgeCriteriaParamId,
  badgeCriteriaParamIdSchema,
  badgeCriteriaParams,
  insertBadgeCriteriaParamSchema,
  NewBadgeCriteriaParamParams,
  UpdateBadgeCriteriaParamParams,
  updateBadgeCriteriaParamSchema,
} from "../../db/schema/badgeCriteriaParams";

export const createBadgeCriteriaParam = async (
  badgeCriteriaParam: NewBadgeCriteriaParamParams,
) => {
  const newBadgeCriteriaParam =
    insertBadgeCriteriaParamSchema.parse(badgeCriteriaParam);
  try {
    const [b] = await db
      .insert(badgeCriteriaParams)
      .values(newBadgeCriteriaParam)
      .returning();
    return { badgeCriteriaParam: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBadgeCriteriaParam = async (
  id: BadgeCriteriaParamId,
  badgeCriteriaParam: UpdateBadgeCriteriaParamParams,
) => {
  const { id: badgeCriteriaParamId } = badgeCriteriaParamIdSchema.parse({ id });
  const newBadgeCriteriaParam =
    updateBadgeCriteriaParamSchema.parse(badgeCriteriaParam);
  try {
    const [b] = await db
      .update(badgeCriteriaParams)
      .set(newBadgeCriteriaParam)
      .where(eq(badgeCriteriaParams.id, badgeCriteriaParamId!))
      .returning();
    return { badgeCriteriaParam: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBadgeCriteriaParam = async (id: BadgeCriteriaParamId) => {
  const { id: badgeCriteriaParamId } = badgeCriteriaParamIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(badgeCriteriaParams)
      .where(eq(badgeCriteriaParams.id, badgeCriteriaParamId!))
      .returning();
    return { badgeCriteriaParam: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
