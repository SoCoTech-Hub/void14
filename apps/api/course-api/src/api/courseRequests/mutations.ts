import type {
  CourseRequestId,
  NewCourseRequestParams,
  UpdateCourseRequestParams,
} from "@soco/course-db/schema/courseRequests";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  courseRequestIdSchema,
  courseRequests,
  insertCourseRequestSchema,
  updateCourseRequestSchema,
} from "@soco/course-db/schema/courseRequests";

export const createCourseRequest = async (
  courseRequest: NewCourseRequestParams,
) => {
  const { session } = await getUserAuth();
  const newCourseRequest = insertCourseRequestSchema.parse({
    ...courseRequest,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(courseRequests)
      .values(newCourseRequest)
      .returning();
    return { courseRequest: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseRequest = async (
  id: CourseRequestId,
  courseRequest: UpdateCourseRequestParams,
) => {
  const { session } = await getUserAuth();
  const { id: courseRequestId } = courseRequestIdSchema.parse({ id });
  const newCourseRequest = updateCourseRequestSchema.parse({
    ...courseRequest,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(courseRequests)
      .set({ ...newCourseRequest, updatedAt: new Date() })
      .where(
        and(
          eq(courseRequests.id, courseRequestId!),
          eq(courseRequests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { courseRequest: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseRequest = async (id: CourseRequestId) => {
  const { session } = await getUserAuth();
  const { id: courseRequestId } = courseRequestIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(courseRequests)
      .where(
        and(
          eq(courseRequests.id, courseRequestId!),
          eq(courseRequests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { courseRequest: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
