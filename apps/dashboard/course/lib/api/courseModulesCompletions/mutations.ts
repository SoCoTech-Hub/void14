import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type CourseModulesCompletionId, 
  type NewCourseModulesCompletionParams,
  type UpdateCourseModulesCompletionParams, 
  updateCourseModulesCompletionSchema,
  insertCourseModulesCompletionSchema, 
  courseModulesCompletions,
  courseModulesCompletionIdSchema 
} from "@/lib/db/schema/courseModulesCompletions";
import { getUserAuth } from "@/lib/auth/utils";

export const createCourseModulesCompletion = async (courseModulesCompletion: NewCourseModulesCompletionParams) => {
  const { session } = await getUserAuth();
  const newCourseModulesCompletion = insertCourseModulesCompletionSchema.parse({ ...courseModulesCompletion, userId: session?.user.id! });
  try {
    const [c] =  await db.insert(courseModulesCompletions).values(newCourseModulesCompletion).returning();
    return { courseModulesCompletion: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateCourseModulesCompletion = async (id: CourseModulesCompletionId, courseModulesCompletion: UpdateCourseModulesCompletionParams) => {
  const { session } = await getUserAuth();
  const { id: courseModulesCompletionId } = courseModulesCompletionIdSchema.parse({ id });
  const newCourseModulesCompletion = updateCourseModulesCompletionSchema.parse({ ...courseModulesCompletion, userId: session?.user.id! });
  try {
    const [c] =  await db
     .update(courseModulesCompletions)
     .set({...newCourseModulesCompletion, updatedAt: new Date() })
     .where(and(eq(courseModulesCompletions.id, courseModulesCompletionId!), eq(courseModulesCompletions.userId, session?.user.id!)))
     .returning();
    return { courseModulesCompletion: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteCourseModulesCompletion = async (id: CourseModulesCompletionId) => {
  const { session } = await getUserAuth();
  const { id: courseModulesCompletionId } = courseModulesCompletionIdSchema.parse({ id });
  try {
    const [c] =  await db.delete(courseModulesCompletions).where(and(eq(courseModulesCompletions.id, courseModulesCompletionId!), eq(courseModulesCompletions.userId, session?.user.id!)))
    .returning();
    return { courseModulesCompletion: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

