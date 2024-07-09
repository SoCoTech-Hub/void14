import type {
  CourseModuleId,
  NewCourseModuleParams,
  UpdateCourseModuleParams,
} from "@soco/course-db/schema/courseModules";
import { db, eq } from "@soco/course-db";
import {
  courseModuleIdSchema,
  courseModules,
  insertCourseModuleSchema,
  updateCourseModuleSchema,
} from "@soco/course-db/schema/courseModules";

export const createCourseModule = async (
  courseModule: NewCourseModuleParams,
) => {
  const newCourseModule = insertCourseModuleSchema.parse(courseModule);
  try {
    const [c] = await db
      .insert(courseModules)
      .values(newCourseModule)
      .returning();
    return { courseModule: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseModule = async (
  id: CourseModuleId,
  courseModule: UpdateCourseModuleParams,
) => {
  const { id: courseModuleId } = courseModuleIdSchema.parse({ id });
  const newCourseModule = updateCourseModuleSchema.parse(courseModule);
  try {
    const [c] = await db
      .update(courseModules)
      .set(newCourseModule)
      .where(eq(courseModules.id, courseModuleId!))
      .returning();
    return { courseModule: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseModule = async (id: CourseModuleId) => {
  const { id: courseModuleId } = courseModuleIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(courseModules)
      .where(eq(courseModules.id, courseModuleId!))
      .returning();
    return { courseModule: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
