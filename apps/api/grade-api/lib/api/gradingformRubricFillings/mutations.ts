import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  GradingformRubricFillingId,
  gradingformRubricFillingIdSchema,
  gradingformRubricFillings,
  insertGradingformRubricFillingSchema,
  NewGradingformRubricFillingParams,
  UpdateGradingformRubricFillingParams,
  updateGradingformRubricFillingSchema,
} from "../../db/schema/gradingformRubricFillings";

export const createGradingformRubricFilling = async (
  gradingformRubricFilling: NewGradingformRubricFillingParams,
) => {
  const newGradingformRubricFilling =
    insertGradingformRubricFillingSchema.parse(gradingformRubricFilling);
  try {
    const [g] = await db
      .insert(gradingformRubricFillings)
      .values(newGradingformRubricFilling)
      .returning();
    return { gradingformRubricFilling: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformRubricFilling = async (
  id: GradingformRubricFillingId,
  gradingformRubricFilling: UpdateGradingformRubricFillingParams,
) => {
  const { id: gradingformRubricFillingId } =
    gradingformRubricFillingIdSchema.parse({ id });
  const newGradingformRubricFilling =
    updateGradingformRubricFillingSchema.parse(gradingformRubricFilling);
  try {
    const [g] = await db
      .update(gradingformRubricFillings)
      .set(newGradingformRubricFilling)
      .where(eq(gradingformRubricFillings.id, gradingformRubricFillingId!))
      .returning();
    return { gradingformRubricFilling: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformRubricFilling = async (
  id: GradingformRubricFillingId,
) => {
  const { id: gradingformRubricFillingId } =
    gradingformRubricFillingIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradingformRubricFillings)
      .where(eq(gradingformRubricFillings.id, gradingformRubricFillingId!))
      .returning();
    return { gradingformRubricFilling: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
