import type { CourseCompletionDefaultId } from "@soco/course-db/schema/courseCompletionDefaults";
import { db, eq } from "@soco/course-db";
import {
  courseCompletionDefaultIdSchema,
  courseCompletionDefaults,
} from "@soco/course-db/schema/courseCompletionDefaults";
import { courses } from "@soco/course-db/schema/courses";

export const getCourseCompletionDefaults = async () => {
  const rows = await db
    .select({
      courseCompletionDefault: courseCompletionDefaults,
      course: courses,
    })
    .from(courseCompletionDefaults)
    .leftJoin(courses, eq(courseCompletionDefaults.courseId, courses.id));
  const c = rows.map((r) => ({
    ...r.courseCompletionDefault,
    course: r.course,
  }));
  return { courseCompletionDefaults: c };
};

export const getCourseCompletionDefaultById = async (
  id: CourseCompletionDefaultId,
) => {
  const { id: courseCompletionDefaultId } =
    courseCompletionDefaultIdSchema.parse({ id });
  const [row] = await db
    .select({
      courseCompletionDefault: courseCompletionDefaults,
      course: courses,
    })
    .from(courseCompletionDefaults)
    .where(eq(courseCompletionDefaults.id, courseCompletionDefaultId))
    .leftJoin(courses, eq(courseCompletionDefaults.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseCompletionDefault, course: row.course };
  return { courseCompletionDefault: c };
};
