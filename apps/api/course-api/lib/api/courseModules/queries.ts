import { eq } from "drizzle-orm";

import type { CourseModuleId } from "../../db/schema/courseModules";
import { db } from "../../db/index";
import {
  courseModuleIdSchema,
  courseModules,
} from "../../db/schema/courseModules";
import { courses } from "../../db/schema/courses";

export const getCourseModules = async () => {
  const rows = await db
    .select({ courseModule: courseModules, course: courses })
    .from(courseModules)
    .leftJoin(courses, eq(courseModules.courseId, courses.id));
  const c = rows.map((r) => ({ ...r.courseModule, course: r.course }));
  return { courseModules: c };
};

export const getCourseModuleById = async (id: CourseModuleId) => {
  const { id: courseModuleId } = courseModuleIdSchema.parse({ id });
  const [row] = await db
    .select({ courseModule: courseModules, course: courses })
    .from(courseModules)
    .where(eq(courseModules.id, courseModuleId))
    .leftJoin(courses, eq(courseModules.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseModule, course: row.course };
  return { courseModule: c };
};
