import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  gradeCategories,
  GradeCategoryId,
  gradeCategoryIdSchema,
  insertGradeCategorySchema,
  NewGradeCategoryParams,
  UpdateGradeCategoryParams,
  updateGradeCategorySchema,
} from "../../db/schema/gradeCategories";

export const createGradeCategory = async (
  gradeCategory: NewGradeCategoryParams,
) => {
  const newGradeCategory = insertGradeCategorySchema.parse(gradeCategory);
  try {
    const [g] = await db
      .insert(gradeCategories)
      .values(newGradeCategory)
      .returning();
    return { gradeCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeCategory = async (
  id: GradeCategoryId,
  gradeCategory: UpdateGradeCategoryParams,
) => {
  const { id: gradeCategoryId } = gradeCategoryIdSchema.parse({ id });
  const newGradeCategory = updateGradeCategorySchema.parse(gradeCategory);
  try {
    const [g] = await db
      .update(gradeCategories)
      .set({ ...newGradeCategory, updatedAt: new Date() })
      .where(eq(gradeCategories.id, gradeCategoryId!))
      .returning();
    return { gradeCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeCategory = async (id: GradeCategoryId) => {
  const { id: gradeCategoryId } = gradeCategoryIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradeCategories)
      .where(eq(gradeCategories.id, gradeCategoryId!))
      .returning();
    return { gradeCategory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
