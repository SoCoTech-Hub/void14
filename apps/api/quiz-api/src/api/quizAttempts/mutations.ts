import { db } from "@soco/quiz-db/index";
import { and, eq } from "drizzle-orm";
import { 
  QuizAttemptId, 
  NewQuizAttemptParams,
  UpdateQuizAttemptParams, 
  updateQuizAttemptSchema,
  insertQuizAttemptSchema, 
  quizAttempts,
  quizAttemptIdSchema 
} from "@soco/quiz-db/schema/quizAttempts";
import { getUserAuth } from "@/lib/auth/utils";

export const createQuizAttempt = async (quizAttempt: NewQuizAttemptParams) => {
  const { session } = await getUserAuth();
  const newQuizAttempt = insertQuizAttemptSchema.parse({ ...quizAttempt, userId: session?.user.id! });
  try {
    const [q] =  await db.insert(quizAttempts).values(newQuizAttempt).returning();
    return { quizAttempt: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizAttempt = async (id: QuizAttemptId, quizAttempt: UpdateQuizAttemptParams) => {
  const { session } = await getUserAuth();
  const { id: quizAttemptId } = quizAttemptIdSchema.parse({ id });
  const newQuizAttempt = updateQuizAttemptSchema.parse({ ...quizAttempt, userId: session?.user.id! });
  try {
    const [q] =  await db
     .update(quizAttempts)
     .set({...newQuizAttempt, updatedAt: new Date() })
     .where(and(eq(quizAttempts.id, quizAttemptId!), eq(quizAttempts.userId, session?.user.id!)))
     .returning();
    return { quizAttempt: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizAttempt = async (id: QuizAttemptId) => {
  const { session } = await getUserAuth();
  const { id: quizAttemptId } = quizAttemptIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizAttempts).where(and(eq(quizAttempts.id, quizAttemptId!), eq(quizAttempts.userId, session?.user.id!)))
    .returning();
    return { quizAttempt: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

