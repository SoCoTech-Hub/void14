import type {
  CourseCompletionCriteriaId,
  NewCourseCompletionCriteriaParams,
  UpdateCourseCompletionCriteriaParams,
} from "@soco/course-db/schema/courseCompletionCriterias";
import { eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  courseCompletionCriteriaIdSchema,
  courseCompletionCriterias,
  insertCourseCompletionCriteriaSchema,
  updateCourseCompletionCriteriaSchema,
} from "@soco/course-db/schema/courseCompletionCriterias";

export const createCourseCompletionCriteria = async (
  courseCompletionCriteria: NewCourseCompletionCriteriaParams,
) => {
  const newCourseCompletionCriteria =
    insertCourseCompletionCriteriaSchema.parse(courseCompletionCriteria);
  try {
    const [c] = await db
      .insert(courseCompletionCriterias)
      .values(newCourseCompletionCriteria)
      .returning();
    return { courseCompletionCriteria: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseCompletionCriteria = async (
  id: CourseCompletionCriteriaId,
  courseCompletionCriteria: UpdateCourseCompletionCriteriaParams,
) => {
  const { id: courseCompletionCriteriaId } =
    courseCompletionCriteriaIdSchema.parse({ id });
  const newCourseCompletionCriteria =
    updateCourseCompletionCriteriaSchema.parse(courseCompletionCriteria);
  try {
    const [c] = await db
      .update(courseCompletionCriterias)
      .set(newCourseCompletionCriteria)
      .where(eq(courseCompletionCriterias.id, courseCompletionCriteriaId!))
      .returning();
    return { courseCompletionCriteria: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseCompletionCriteria = async (
  id: CourseCompletionCriteriaId,
) => {
  const { id: courseCompletionCriteriaId } =
    courseCompletionCriteriaIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(courseCompletionCriterias)
      .where(eq(courseCompletionCriterias.id, courseCompletionCriteriaId!))
      .returning();
    return { courseCompletionCriteria: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
