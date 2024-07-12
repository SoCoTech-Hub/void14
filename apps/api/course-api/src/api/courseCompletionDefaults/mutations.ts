import type {
  CourseCompletionDefaultId,
  NewCourseCompletionDefaultParams,
  UpdateCourseCompletionDefaultParams,
} from "@soco/course-db/schema/courseCompletionDefaults";
import { eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  courseCompletionDefaultIdSchema,
  courseCompletionDefaults,
  insertCourseCompletionDefaultSchema,
  updateCourseCompletionDefaultSchema,
} from "@soco/course-db/schema/courseCompletionDefaults";

export const createCourseCompletionDefault = async (
  courseCompletionDefault: NewCourseCompletionDefaultParams,
) => {
  const newCourseCompletionDefault = insertCourseCompletionDefaultSchema.parse(
    courseCompletionDefault,
  );
  try {
    const [c] = await db
      .insert(courseCompletionDefaults)
      .values(newCourseCompletionDefault)
      .returning();
    return { courseCompletionDefault: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseCompletionDefault = async (
  id: CourseCompletionDefaultId,
  courseCompletionDefault: UpdateCourseCompletionDefaultParams,
) => {
  const { id: courseCompletionDefaultId } =
    courseCompletionDefaultIdSchema.parse({ id });
  const newCourseCompletionDefault = updateCourseCompletionDefaultSchema.parse(
    courseCompletionDefault,
  );
  try {
    const [c] = await db
      .update(courseCompletionDefaults)
      .set(newCourseCompletionDefault)
      .where(eq(courseCompletionDefaults.id, courseCompletionDefaultId!))
      .returning();
    return { courseCompletionDefault: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseCompletionDefault = async (
  id: CourseCompletionDefaultId,
) => {
  const { id: courseCompletionDefaultId } =
    courseCompletionDefaultIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(courseCompletionDefaults)
      .where(eq(courseCompletionDefaults.id, courseCompletionDefaultId!))
      .returning();
    return { courseCompletionDefault: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
