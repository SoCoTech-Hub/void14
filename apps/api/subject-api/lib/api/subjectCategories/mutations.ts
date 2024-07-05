import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertSubjectCategorySchema,
  NewSubjectCategoryParams,
  subjectCategories,
  SubjectCategoryId,
  subjectCategoryIdSchema,
  UpdateSubjectCategoryParams,
  updateSubjectCategorySchema,
} from "../../db/schema/subjectCategories";

export const createSubjectCategory = async (
  subjectCategory: NewSubjectCategoryParams,
) => {
  const newSubjectCategory = insertSubjectCategorySchema.parse(subjectCategory);
  try {
    const [s] = await db
      .insert(subjectCategories)
      .values(newSubjectCategory)
      .returning();
    return { subjectCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSubjectCategory = async (
  id: SubjectCategoryId,
  subjectCategory: UpdateSubjectCategoryParams,
) => {
  const { id: subjectCategoryId } = subjectCategoryIdSchema.parse({ id });
  const newSubjectCategory = updateSubjectCategorySchema.parse(subjectCategory);
  try {
    const [s] = await db
      .update(subjectCategories)
      .set(newSubjectCategory)
      .where(eq(subjectCategories.id, subjectCategoryId!))
      .returning();
    return { subjectCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSubjectCategory = async (id: SubjectCategoryId) => {
  const { id: subjectCategoryId } = subjectCategoryIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(subjectCategories)
      .where(eq(subjectCategories.id, subjectCategoryId!))
      .returning();
    return { subjectCategory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
