import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  LessonAttemptId, 
  NewLessonAttemptParams,
  UpdateLessonAttemptParams, 
  updateLessonAttemptSchema,
  insertLessonAttemptSchema, 
  lessonAttempts,
  lessonAttemptIdSchema 
} from "@/lib/db/schema/lessonAttempts";
import { getUserAuth } from "@/lib/auth/utils";

export const createLessonAttempt = async (lessonAttempt: NewLessonAttemptParams) => {
  const { session } = await getUserAuth();
  const newLessonAttempt = insertLessonAttemptSchema.parse({ ...lessonAttempt, userId: session?.user.id! });
  try {
    const [l] =  await db.insert(lessonAttempts).values(newLessonAttempt).returning();
    return { lessonAttempt: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLessonAttempt = async (id: LessonAttemptId, lessonAttempt: UpdateLessonAttemptParams) => {
  const { session } = await getUserAuth();
  const { id: lessonAttemptId } = lessonAttemptIdSchema.parse({ id });
  const newLessonAttempt = updateLessonAttemptSchema.parse({ ...lessonAttempt, userId: session?.user.id! });
  try {
    const [l] =  await db
     .update(lessonAttempts)
     .set({...newLessonAttempt, updatedAt: new Date() })
     .where(and(eq(lessonAttempts.id, lessonAttemptId!), eq(lessonAttempts.userId, session?.user.id!)))
     .returning();
    return { lessonAttempt: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLessonAttempt = async (id: LessonAttemptId) => {
  const { session } = await getUserAuth();
  const { id: lessonAttemptId } = lessonAttemptIdSchema.parse({ id });
  try {
    const [l] =  await db.delete(lessonAttempts).where(and(eq(lessonAttempts.id, lessonAttemptId!), eq(lessonAttempts.userId, session?.user.id!)))
    .returning();
    return { lessonAttempt: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

