import { eq } from "drizzle-orm";

import type { CourseFormatOptionId } from "../../db/schema/courseFormatOptions";
import { db } from "../../db/index";
import {
  courseFormatOptionIdSchema,
  courseFormatOptions,
} from "../../db/schema/courseFormatOptions";
import { courses } from "../../db/schema/courses";

export const getCourseFormatOptions = async () => {
  const rows = await db
    .select({ courseFormatOption: courseFormatOptions, course: courses })
    .from(courseFormatOptions)
    .leftJoin(courses, eq(courseFormatOptions.courseId, courses.id));
  const c = rows.map((r) => ({ ...r.courseFormatOption, course: r.course }));
  return { courseFormatOptions: c };
};

export const getCourseFormatOptionById = async (id: CourseFormatOptionId) => {
  const { id: courseFormatOptionId } = courseFormatOptionIdSchema.parse({ id });
  const [row] = await db
    .select({ courseFormatOption: courseFormatOptions, course: courses })
    .from(courseFormatOptions)
    .where(eq(courseFormatOptions.id, courseFormatOptionId))
    .leftJoin(courses, eq(courseFormatOptions.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseFormatOption, course: row.course };
  return { courseFormatOption: c };
};
