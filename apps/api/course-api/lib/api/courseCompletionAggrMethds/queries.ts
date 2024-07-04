import { eq } from "drizzle-orm";

import type { CourseCompletionAggrMethdId } from "../db/schema/courseCompletionAggrMethds";
import { db } from "../db/index";
import {
  courseCompletionAggrMethdIdSchema,
  courseCompletionAggrMethds,
} from "../db/schema/courseCompletionAggrMethds";
import { courses } from "../db/schema/courses";

export const getCourseCompletionAggrMethds = async () => {
  const rows = await db
    .select({
      courseCompletionAggrMethd: courseCompletionAggrMethds,
      course: courses,
    })
    .from(courseCompletionAggrMethds)
    .leftJoin(courses, eq(courseCompletionAggrMethds.courseId, courses.id));
  const c = rows.map((r) => ({
    ...r.courseCompletionAggrMethd,
    course: r.course,
  }));
  return { courseCompletionAggrMethds: c };
};

export const getCourseCompletionAggrMethdById = async (
  id: CourseCompletionAggrMethdId,
) => {
  const { id: courseCompletionAggrMethdId } =
    courseCompletionAggrMethdIdSchema.parse({ id });
  const [row] = await db
    .select({
      courseCompletionAggrMethd: courseCompletionAggrMethds,
      course: courses,
    })
    .from(courseCompletionAggrMethds)
    .where(eq(courseCompletionAggrMethds.id, courseCompletionAggrMethdId))
    .leftJoin(courses, eq(courseCompletionAggrMethds.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseCompletionAggrMethd, course: row.course };
  return { courseCompletionAggrMethd: c };
};
