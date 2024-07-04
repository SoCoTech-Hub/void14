import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  CourseCompletionId,
  courseCompletionIdSchema,
  courseCompletions,
  insertCourseCompletionSchema,
  NewCourseCompletionParams,
  UpdateCourseCompletionParams,
  updateCourseCompletionSchema,
} from "../db/schema/courseCompletions";

export const createCourseCompletion = async (
  courseCompletion: NewCourseCompletionParams,
) => {
  const { session } = await getUserAuth();
  const newCourseCompletion = insertCourseCompletionSchema.parse({
    ...courseCompletion,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(courseCompletions)
      .values(newCourseCompletion)
      .returning();
    return { courseCompletion: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseCompletion = async (
  id: CourseCompletionId,
  courseCompletion: UpdateCourseCompletionParams,
) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionId } = courseCompletionIdSchema.parse({ id });
  const newCourseCompletion = updateCourseCompletionSchema.parse({
    ...courseCompletion,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(courseCompletions)
      .set(newCourseCompletion)
      .where(
        and(
          eq(courseCompletions.id, courseCompletionId!),
          eq(courseCompletions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { courseCompletion: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseCompletion = async (id: CourseCompletionId) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionId } = courseCompletionIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(courseCompletions)
      .where(
        and(
          eq(courseCompletions.id, courseCompletionId!),
          eq(courseCompletions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { courseCompletion: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
