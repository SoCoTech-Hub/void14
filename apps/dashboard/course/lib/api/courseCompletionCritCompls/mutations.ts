import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type CourseCompletionCritComplId, 
  type NewCourseCompletionCritComplParams,
  type UpdateCourseCompletionCritComplParams, 
  updateCourseCompletionCritComplSchema,
  insertCourseCompletionCritComplSchema, 
  courseCompletionCritCompls,
  courseCompletionCritComplIdSchema 
} from "@/lib/db/schema/courseCompletionCritCompls";
import { getUserAuth } from "@/lib/auth/utils";

export const createCourseCompletionCritCompl = async (courseCompletionCritCompl: NewCourseCompletionCritComplParams) => {
  const { session } = await getUserAuth();
  const newCourseCompletionCritCompl = insertCourseCompletionCritComplSchema.parse({ ...courseCompletionCritCompl, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(courseCompletionCritCompls).values(newCourseCompletionCritCompl).returning();
    return { courseCompletionCritCompl: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseCompletionCritCompl = async (id: CourseCompletionCritComplId, courseCompletionCritCompl: UpdateCourseCompletionCritComplParams) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionCritComplId } = courseCompletionCritComplIdSchema.parse({ id });
  const newCourseCompletionCritCompl = updateCourseCompletionCritComplSchema.parse({ ...courseCompletionCritCompl, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(courseCompletionCritCompls)
     .set(newCourseCompletionCritCompl)
     .where(and(eq(courseCompletionCritCompls.id, courseCompletionCritComplId!), eq(courseCompletionCritCompls.userId, session?.user.id!)))
     .returning();
    return { courseCompletionCritCompl: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseCompletionCritCompl = async (id: CourseCompletionCritComplId) => {
  const { session } = await getUserAuth();
  const { id: courseCompletionCritComplId } = courseCompletionCritComplIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(courseCompletionCritCompls).where(and(eq(courseCompletionCritCompls.id, courseCompletionCritComplId!), eq(courseCompletionCritCompls.userId, session?.user.id!)))
    .returning();
    return { courseCompletionCritCompl: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

