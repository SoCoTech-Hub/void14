import { db } from "@soco/course-db/client";
import { eq } from "@soco/course-db";
import { 
  type CourseCompletionAggrMethdId, 
  type NewCourseCompletionAggrMethdParams,
  type UpdateCourseCompletionAggrMethdParams, 
  updateCourseCompletionAggrMethdSchema,
  insertCourseCompletionAggrMethdSchema, 
  courseCompletionAggrMethds,
  courseCompletionAggrMethdIdSchema 
} from "@soco/course-db/schema/courseCompletionAggrMethds";

export const createCourseCompletionAggrMethd = async (courseCompletionAggrMethd: NewCourseCompletionAggrMethdParams) => {
  const newCourseCompletionAggrMethd = insertCourseCompletionAggrMethdSchema.parse(courseCompletionAggrMethd);
  try {
    const [c] =  await db.insert(courseCompletionAggrMethds).values(newCourseCompletionAggrMethd).returning();
    return { courseCompletionAggrMethd: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseCompletionAggrMethd = async (id: CourseCompletionAggrMethdId, courseCompletionAggrMethd: UpdateCourseCompletionAggrMethdParams) => {
  const { id: courseCompletionAggrMethdId } = courseCompletionAggrMethdIdSchema.parse({ id });
  const newCourseCompletionAggrMethd = updateCourseCompletionAggrMethdSchema.parse(courseCompletionAggrMethd);
  try {
    const [c] =  await db
     .update(courseCompletionAggrMethds)
     .set(newCourseCompletionAggrMethd)
     .where(eq(courseCompletionAggrMethds.id, courseCompletionAggrMethdId!))
     .returning();
    return { courseCompletionAggrMethd: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseCompletionAggrMethd = async (id: CourseCompletionAggrMethdId) => {
  const { id: courseCompletionAggrMethdId } = courseCompletionAggrMethdIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(courseCompletionAggrMethds).where(eq(courseCompletionAggrMethds.id, courseCompletionAggrMethdId!))
    .returning();
    return { courseCompletionAggrMethd: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

