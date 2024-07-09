import type { CourseId } from "@soco/course-db/schema/courses";
import { db, eq } from "@soco/course-db";
import { courseIdSchema, courses } from "@soco/course-db/schema/courses";

export const getCourses = async () => {
  const rows = await db.select().from(courses);
  const c = rows;
  return { courses: c };
};

export const getCourseById = async (id: CourseId) => {
  const { id: courseId } = courseIdSchema.parse({ id });
  const [row] = await db.select().from(courses).where(eq(courses.id, courseId));
  if (row === undefined) return {};
  const c = row;
  return { course: c };
};
