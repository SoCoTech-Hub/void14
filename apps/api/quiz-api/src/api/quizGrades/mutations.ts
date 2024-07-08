import { db } from "@soco/quiz-db/index";
import { and, eq } from "drizzle-orm";
import { 
  QuizGradeId, 
  NewQuizGradeParams,
  UpdateQuizGradeParams, 
  updateQuizGradeSchema,
  insertQuizGradeSchema, 
  quizGrades,
  quizGradeIdSchema 
} from "@soco/quiz-db/schema/quizGrades";
import { getUserAuth } from "@/lib/auth/utils";

export const createQuizGrade = async (quizGrade: NewQuizGradeParams) => {
  const { session } = await getUserAuth();
  const newQuizGrade = insertQuizGradeSchema.parse({ ...quizGrade, userId: session?.user.id! });
  try {
    const [q] =  await db.insert(quizGrades).values(newQuizGrade).returning();
    return { quizGrade: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizGrade = async (id: QuizGradeId, quizGrade: UpdateQuizGradeParams) => {
  const { session } = await getUserAuth();
  const { id: quizGradeId } = quizGradeIdSchema.parse({ id });
  const newQuizGrade = updateQuizGradeSchema.parse({ ...quizGrade, userId: session?.user.id! });
  try {
    const [q] =  await db
     .update(quizGrades)
     .set({...newQuizGrade, updatedAt: new Date() })
     .where(and(eq(quizGrades.id, quizGradeId!), eq(quizGrades.userId, session?.user.id!)))
     .returning();
    return { quizGrade: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizGrade = async (id: QuizGradeId) => {
  const { session } = await getUserAuth();
  const { id: quizGradeId } = quizGradeIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizGrades).where(and(eq(quizGrades.id, quizGradeId!), eq(quizGrades.userId, session?.user.id!)))
    .returning();
    return { quizGrade: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

