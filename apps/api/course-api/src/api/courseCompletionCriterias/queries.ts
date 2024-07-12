import type { CourseCompletionCriteriaId } from "@soco/course-db/schema/courseCompletionCriterias";
import { eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  courseCompletionCriteriaIdSchema,
  courseCompletionCriterias,
} from "@soco/course-db/schema/courseCompletionCriterias";
import { courses } from "@soco/course-db/schema/courses";

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
