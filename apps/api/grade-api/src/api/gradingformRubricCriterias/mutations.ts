import type {
  GradingformRubricCriteriaId,
  NewGradingformRubricCriteriaParams,
  UpdateGradingformRubricCriteriaParams,
} from "@soco/grade-db/schema/gradingformRubricCriterias";
import { eq } from "@soco/grade-db";
import { db } from "@soco/grade-db/client";
import {
  gradingformRubricCriteriaIdSchema,
  gradingformRubricCriterias,
  insertGradingformRubricCriteriaSchema,
  updateGradingformRubricCriteriaSchema,
} from "@soco/grade-db/schema/gradingformRubricCriterias";

export const createGradingformRubricCriteria = async (
  gradingformRubricCriteria: NewGradingformRubricCriteriaParams,
) => {
  const newGradingformRubricCriteria =
    insertGradingformRubricCriteriaSchema.parse(gradingformRubricCriteria);
  try {
    const [g] = await db
      .insert(gradingformRubricCriterias)
      .values(newGradingformRubricCriteria)
      .returning();
    return { gradingformRubricCriteria: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingformRubricCriteria = async (
  id: GradingformRubricCriteriaId,
  gradingformRubricCriteria: UpdateGradingformRubricCriteriaParams,
) => {
  const { id: gradingformRubricCriteriaId } =
    gradingformRubricCriteriaIdSchema.parse({ id });
  const newGradingformRubricCriteria =
    updateGradingformRubricCriteriaSchema.parse(gradingformRubricCriteria);
  try {
    const [g] = await db
      .update(gradingformRubricCriterias)
      .set(newGradingformRubricCriteria)
      .where(eq(gradingformRubricCriterias.id, gradingformRubricCriteriaId!))
      .returning();
    return { gradingformRubricCriteria: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingformRubricCriteria = async (
  id: GradingformRubricCriteriaId,
) => {
  const { id: gradingformRubricCriteriaId } =
    gradingformRubricCriteriaIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradingformRubricCriterias)
      .where(eq(gradingformRubricCriterias.id, gradingformRubricCriteriaId!))
      .returning();
    return { gradingformRubricCriteria: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
