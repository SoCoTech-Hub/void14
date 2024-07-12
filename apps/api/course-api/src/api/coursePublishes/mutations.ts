import type {
  CoursePublishId,
  NewCoursePublishParams,
  UpdateCoursePublishParams,
} from "@soco/course-db/schema/coursePublishes";
import { eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  coursePublishes,
  coursePublishIdSchema,
  insertCoursePublishSchema,
  updateCoursePublishSchema,
} from "@soco/course-db/schema/coursePublishes";

export const createCoursePublish = async (
  coursePublish: NewCoursePublishParams,
) => {
  const newCoursePublish = insertCoursePublishSchema.parse(coursePublish);
  try {
    const [c] = await db
      .insert(coursePublishes)
      .values(newCoursePublish)
      .returning();
    return { coursePublish: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCoursePublish = async (
  id: CoursePublishId,
  coursePublish: UpdateCoursePublishParams,
) => {
  const { id: coursePublishId } = coursePublishIdSchema.parse({ id });
  const newCoursePublish = updateCoursePublishSchema.parse(coursePublish);
  try {
    const [c] = await db
      .update(coursePublishes)
      .set({ ...newCoursePublish, updatedAt: new Date() })
      .where(eq(coursePublishes.id, coursePublishId!))
      .returning();
    return { coursePublish: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCoursePublish = async (id: CoursePublishId) => {
  const { id: coursePublishId } = coursePublishIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(coursePublishes)
      .where(eq(coursePublishes.id, coursePublishId!))
      .returning();
    return { coursePublish: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
