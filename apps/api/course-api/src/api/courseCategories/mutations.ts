import type {
  CourseCategoryId,
  NewCourseCategoryParams,
  UpdateCourseCategoryParams,
} from "@soco/course-db/schema/courseCategories";
import { eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  courseCategories,
  courseCategoryIdSchema,
  insertCourseCategorySchema,
  updateCourseCategorySchema,
} from "@soco/course-db/schema/courseCategories";

export const createCourseCategory = async (
  courseCategory: NewCourseCategoryParams,
) => {
  const newCourseCategory = insertCourseCategorySchema.parse(courseCategory);
  try {
    const [c] = await db
      .insert(courseCategories)
      .values(newCourseCategory)
      .returning();
    return { courseCategory: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseCategory = async (
  id: CourseCategoryId,
  courseCategory: UpdateCourseCategoryParams,
) => {
  const { id: courseCategoryId } = courseCategoryIdSchema.parse({ id });
  const newCourseCategory = updateCourseCategorySchema.parse(courseCategory);
  try {
    const [c] = await db
      .update(courseCategories)
      .set({ ...newCourseCategory, updatedAt: new Date() })
      .where(eq(courseCategories.id, courseCategoryId!))
      .returning();
    return { courseCategory: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseCategory = async (id: CourseCategoryId) => {
  const { id: courseCategoryId } = courseCategoryIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(courseCategories)
      .where(eq(courseCategories.id, courseCategoryId!))
      .returning();
    return { courseCategory: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
