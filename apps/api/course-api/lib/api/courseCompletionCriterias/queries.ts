import { eq } from "drizzle-orm";

import type { CourseCompletionCriteriaId } from "../../db/schema/courseCompletionCriterias";
import { db } from "../../db/index";
import {
  courseCompletionCriteriaIdSchema,
  courseCompletionCriterias,
} from "../../db/schema/courseCompletionCriterias";
import { courses } from "../../db/schema/courses";

export const getCourseCompletionCriterias = async () => {
  const rows = await db
    .select({
      courseCompletionCriteria: courseCompletionCriterias,
      course: courses,
    })
    .from(courseCompletionCriterias)
    .leftJoin(courses, eq(courseCompletionCriterias.courseId, courses.id));
  const c = rows.map((r) => ({
    ...r.courseCompletionCriteria,
    course: r.course,
  }));
  return { courseCompletionCriterias: c };
};

export const getCourseCompletionCriteriaById = async (
  id: CourseCompletionCriteriaId,
) => {
  const { id: courseCompletionCriteriaId } =
    courseCompletionCriteriaIdSchema.parse({ id });
  const [row] = await db
    .select({
      courseCompletionCriteria: courseCompletionCriterias,
      course: courses,
    })
    .from(courseCompletionCriterias)
    .where(eq(courseCompletionCriterias.id, courseCompletionCriteriaId))
    .leftJoin(courses, eq(courseCompletionCriterias.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseCompletionCriteria, course: row.course };
  return { courseCompletionCriteria: c };
};
