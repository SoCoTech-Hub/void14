import type {
  GradingformRubricLevelId,
  NewGradingformRubricLevelParams,
  UpdateGradingformRubricLevelParams,
} from "@soco/grade-db/schema/gradingformRubricLevels";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformRubricLevelIdSchema,
  gradingformRubricLevels,
  insertGradingformRubricLevelSchema,
  updateGradingformRubricLevelSchema,
} from "@soco/grade-db/schema/gradingformRubricLevels";

export const createGradingformRubricLevel = async (
  gradingformRubricLevel: NewGradingformRubricLevelParams,
) => {
  const newGradingformRubricLevel = insertGradingformRubricLevelSchema.parse(
    gradingformRubricLevel,
  );
  try {
    const [g] = await db
      .insert(gradingformRubricLevels)
      .values(newGradingformRubricLevel)
      .returning();
    return { gradingformRubricLevel: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformRubricLevel = async (
  id: GradingformRubricLevelId,
  gradingformRubricLevel: UpdateGradingformRubricLevelParams,
) => {
  const { id: gradingformRubricLevelId } = gradingformRubricLevelIdSchema.parse(
    { id },
  );
  const newGradingformRubricLevel = updateGradingformRubricLevelSchema.parse(
    gradingformRubricLevel,
  );
  try {
    const [g] = await db
      .update(gradingformRubricLevels)
      .set(newGradingformRubricLevel)
      .where(eq(gradingformRubricLevels.id, gradingformRubricLevelId!))
      .returning();
    return { gradingformRubricLevel: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformRubricLevel = async (
  id: GradingformRubricLevelId,
) => {
  const { id: gradingformRubricLevelId } = gradingformRubricLevelIdSchema.parse(
    { id },
  );
  try {
    const [g] = await db
      .delete(gradingformRubricLevels)
      .where(eq(gradingformRubricLevels.id, gradingformRubricLevelId!))
      .returning();
    return { gradingformRubricLevel: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
