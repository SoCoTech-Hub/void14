import type { CourseCompletionId } from "@soco/course-db/schema/courseCompletions";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/course-db";
import { db } from "@soco/course-db/client";
import {
  courseCompletionIdSchema,
  courseCompletions,
} from "@soco/course-db/schema/courseCompletions";
import { courses } from "@soco/course-db/schema/courses";

export const getCourseCompletions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ courseCompletion: courseCompletions, course: courses })
    .from(courseCompletions)
    .leftJoin(courses, eq(courseCompletions.courseId, courses.id))
    .where(eq(courseCompletions.userId, session?.user.id!));
  const c = rows.map((r) => ({ ...r.courseCompletion, course: r.course }));
  return { courseCompletions: c };
};

export const getCourseCompletionById = async (id: CourseCompletionId) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionId } = courseCompletionIdSchema.parse({ id });
  const [row] = await db
    .select({ courseCompletion: courseCompletions, course: courses })
    .from(courseCompletions)
    .where(
      and(
        eq(courseCompletions.id, courseCompletionId),
        eq(courseCompletions.userId, session?.user.id!),
      ),
    )
    .leftJoin(courses, eq(courseCompletions.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseCompletion, course: row.course };
  return { courseCompletion: c };
};
