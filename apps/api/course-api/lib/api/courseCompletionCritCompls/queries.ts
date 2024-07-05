import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { CourseCompletionCritComplId } from "../../db/schema/courseCompletionCritCompls";
import { db } from "../../db/index";
import {
  courseCompletionCritComplIdSchema,
  courseCompletionCritCompls,
} from "../../db/schema/courseCompletionCritCompls";
import { courses } from "../../db/schema/courses";

export const getCourseCompletionCritCompls = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      courseCompletionCritCompl: courseCompletionCritCompls,
      course: courses,
    })
    .from(courseCompletionCritCompls)
    .leftJoin(courses, eq(courseCompletionCritCompls.courseId, courses.id))
    .where(eq(courseCompletionCritCompls.userId, session?.user.id!));
  const c = rows.map((r) => ({
    ...r.courseCompletionCritCompl,
    course: r.course,
  }));
  return { courseCompletionCritCompls: c };
};

export const getCourseCompletionCritComplById = async (
  id: CourseCompletionCritComplId,
) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionCritComplId } =
    courseCompletionCritComplIdSchema.parse({ id });
  const [row] = await db
    .select({
      courseCompletionCritCompl: courseCompletionCritCompls,
      course: courses,
    })
    .from(courseCompletionCritCompls)
    .where(
      and(
        eq(courseCompletionCritCompls.id, courseCompletionCritComplId),
        eq(courseCompletionCritCompls.userId, session?.user.id!),
      ),
    )
    .leftJoin(courses, eq(courseCompletionCritCompls.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseCompletionCritCompl, course: row.course };
  return { courseCompletionCritCompl: c };
};
