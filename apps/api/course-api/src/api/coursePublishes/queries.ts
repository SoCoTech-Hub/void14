import { db } from "@soco/course-db/client";
import { eq } from "@soco/course-db";
import { type CoursePublishId, coursePublishIdSchema, coursePublishes } from "@soco/course-db/schema/coursePublishes";
import { courses } from "@soco/course-db/schema/courses";

export const getCoursePublishes = async () => {
  const rows = await db.select({ coursePublish: coursePublishes, course: courses }).from(coursePublishes).leftJoin(courses, eq(coursePublishes.courseId, courses.id));
  const c = rows .map((r) => ({ ...r.coursePublish, course: r.course})); 
  return { coursePublishes: c };
};

export const getCoursePublishById = async (id: CoursePublishId) => {
  const { id: coursePublishId } = coursePublishIdSchema.parse({ id });
  const [row] = await db.select({ coursePublish: coursePublishes, course: courses }).from(coursePublishes).where(eq(coursePublishes.id, coursePublishId)).leftJoin(courses, eq(coursePublishes.courseId, courses.id));
  if (row === undefined) return {};
  const c =  { ...row.coursePublish, course: row.course } ;
  return { coursePublish: c };
};


