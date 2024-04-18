import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type CourseId, courseIdSchema, courses } from "@/lib/db/schema/courses";
import { courseCategories } from "@/lib/db/schema/courseCategories";

export const getCourses = async () => {
  const rows = await db.select({ course: courses, courseCategory: courseCategories }).from(courses).leftJoin(courseCategories, eq(courses.courseCategoryId, courseCategories.id));
  const c = rows .map((r) => ({ ...r.course, courseCategory: r.courseCategory})); 
  return { courses: c };
};

export const getCourseById = async (id: CourseId) => {
  const { id: courseId } = courseIdSchema.parse({ id });
  const [row] = await db.select({ course: courses, courseCategory: courseCategories }).from(courses).where(eq(courses.id, courseId)).leftJoin(courseCategories, eq(courses.courseCategoryId, courseCategories.id));
  if (row === undefined) return {};
  const c =  { ...row.course, courseCategory: row.courseCategory } ;
  return { course: c };
};


