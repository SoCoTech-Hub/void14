import { db } from "@soco/course-db/client";
import { eq, and } from "@soco/course-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type CourseCompletionCritComplId, courseCompletionCritComplIdSchema, courseCompletionCritCompls } from "@soco/course-db/schema/courseCompletionCritCompls";
import { courses } from "@soco/course-db/schema/courses";

export const getCourseCompletionCritCompls = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ courseCompletionCritCompl: courseCompletionCritCompls, course: courses }).from(courseCompletionCritCompls).leftJoin(courses, eq(courseCompletionCritCompls.courseId, courses.id)).where(eq(courseCompletionCritCompls.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.courseCompletionCritCompl, course: r.course})); 
  return { courseCompletionCritCompls: c };
};

export const getCourseCompletionCritComplById = async (id: CourseCompletionCritComplId) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionCritComplId } = courseCompletionCritComplIdSchema.parse({ id });
  const [row] = await db.select({ courseCompletionCritCompl: courseCompletionCritCompls, course: courses }).from(courseCompletionCritCompls).where(and(eq(courseCompletionCritCompls.id, courseCompletionCritComplId), eq(courseCompletionCritCompls.userId, session?.user.id!))).leftJoin(courses, eq(courseCompletionCritCompls.courseId, courses.id));
  if (row === undefined) return {};
  const c =  { ...row.courseCompletionCritCompl, course: row.course } ;
  return { courseCompletionCritCompl: c };
};


