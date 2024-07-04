import { eq } from "drizzle-orm";

import type { CourseSectionId } from "../db/schema/courseSections";
import { db } from "../db/index";
import { courses } from "../db/schema/courses";
import {
  courseSectionIdSchema,
  courseSections,
} from "../db/schema/courseSections";

export const getCourseSections = async () => {
  const rows = await db
    .select({ courseSection: courseSections, course: courses })
    .from(courseSections)
    .leftJoin(courses, eq(courseSections.courseId, courses.id));
  const c = rows.map((r) => ({ ...r.courseSection, course: r.course }));
  return { courseSections: c };
};

export const getCourseSectionById = async (id: CourseSectionId) => {
  const { id: courseSectionId } = courseSectionIdSchema.parse({ id });
  const [row] = await db
    .select({ courseSection: courseSections, course: courses })
    .from(courseSections)
    .where(eq(courseSections.id, courseSectionId))
    .leftJoin(courses, eq(courseSections.courseId, courses.id));
  if (row === undefined) return {};
  const c = { ...row.courseSection, course: row.course };
  return { courseSection: c };
};
