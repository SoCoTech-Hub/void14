import { db } from "@soco/course-db/client";
import { eq } from "@soco/course-db";
import { type CourseCategoryId, courseCategoryIdSchema, courseCategories } from "@soco/course-db/schema/courseCategories";

export const getCourseCategories = async () => {
  const rows = await db.select().from(courseCategories);
  const c = rows
  return { courseCategories: c };
};

export const getCourseCategoryById = async (id: CourseCategoryId) => {
  const { id: courseCategoryId } = courseCategoryIdSchema.parse({ id });
  const [row] = await db.select().from(courseCategories).where(eq(courseCategories.id, courseCategoryId));
  if (row === undefined) return {};
  const c = row;
  return { courseCategory: c };
};


