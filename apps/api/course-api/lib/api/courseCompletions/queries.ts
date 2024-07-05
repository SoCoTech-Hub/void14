import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CourseCompletionId } from "../../db/schema/courseCompletions";
import { db } from "../../db/index";
import {
  courseCompletionIdSchema,
  courseCompletions,
} from "../../db/schema/courseCompletions";
import { courses } from "../../db/schema/courses";

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
