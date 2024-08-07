import type {
  GradingformGuideCriterionId,
  NewGradingformGuideCriterionParams,
  UpdateGradingformGuideCriterionParams,
} from "@soco/grade-db/schema/gradingformGuideCriteria";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformGuideCriteria,
  gradingformGuideCriterionIdSchema,
  insertGradingformGuideCriterionSchema,
  updateGradingformGuideCriterionSchema,
} from "@soco/grade-db/schema/gradingformGuideCriteria";

export const createGradingformGuideCriterion = async (
  gradingformGuideCriterion: NewGradingformGuideCriterionParams,
) => {
  const newGradingformGuideCriterion =
    insertGradingformGuideCriterionSchema.parse(gradingformGuideCriterion);
  try {
    const [g] = await db
      .insert(gradingformGuideCriteria)
      .values(newGradingformGuideCriterion)
      .returning();
    return { gradingformGuideCriterion: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformGuideCriterion = async (
  id: GradingformGuideCriterionId,
  gradingformGuideCriterion: UpdateGradingformGuideCriterionParams,
) => {
  const { id: gradingformGuideCriterionId } =
    gradingformGuideCriterionIdSchema.parse({ id });
  const newGradingformGuideCriterion =
    updateGradingformGuideCriterionSchema.parse(gradingformGuideCriterion);
  try {
    const [g] = await db
      .update(gradingformGuideCriteria)
      .set(newGradingformGuideCriterion)
      .where(eq(gradingformGuideCriteria.id, gradingformGuideCriterionId!))
      .returning();
    return { gradingformGuideCriterion: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformGuideCriterion = async (
  id: GradingformGuideCriterionId,
) => {
  const { id: gradingformGuideCriterionId } =
    gradingformGuideCriterionIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradingformGuideCriteria)
      .where(eq(gradingformGuideCriteria.id, gradingformGuideCriterionId!))
      .returning();
    return { gradingformGuideCriterion: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
