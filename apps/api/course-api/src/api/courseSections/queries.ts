import { db } from "@soco/course-db/client";
import { eq } from "@soco/course-db";
import { type CourseSectionId, courseSectionIdSchema, courseSections } from "@soco/course-db/schema/courseSections";
import { courses } from "@soco/course-db/schema/courses";

export const getCourseSections = async () => {
  const rows = await db.select({ courseSection: courseSections, course: courses }).from(courseSections).leftJoin(courses, eq(courseSections.courseId, courses.id));
  const c = rows .map((r) => ({ ...r.courseSection, course: r.course})); 
  return { courseSections: c };
};

export const getCourseSectionById = async (id: CourseSectionId) => {
  const { id: courseSectionId } = courseSectionIdSchema.parse({ id });
  const [row] = await db.select({ courseSection: courseSections, course: courses }).from(courseSections).where(eq(courseSections.id, courseSectionId)).leftJoin(courses, eq(courseSections.courseId, courses.id));
  if (row === undefined) return {};
  const c =  { ...row.courseSection, course: row.course } ;
  return { courseSection: c };
};


