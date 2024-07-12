import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type QuizStatisticId, 
  type NewQuizStatisticParams,
  type UpdateQuizStatisticParams, 
  updateQuizStatisticSchema,
  insertQuizStatisticSchema, 
  quizStatistics,
  quizStatisticIdSchema 
} from "@/lib/db/schema/quizStatistics";

export const createQuizStatistic = async (quizStatistic: NewQuizStatisticParams) => {
  const newQuizStatistic = insertQuizStatisticSchema.parse(quizStatistic);
  try {
    const [q] =  await db.insert(quizStatistics).values(newQuizStatistic).returning();
    return { quizStatistic: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizStatistic = async (id: QuizStatisticId, quizStatistic: UpdateQuizStatisticParams) => {
  const { id: quizStatisticId } = quizStatisticIdSchema.parse({ id });
  const newQuizStatistic = updateQuizStatisticSchema.parse(quizStatistic);
  try {
    const [q] =  await db
     .update(quizStatistics)
     .set({...newQuizStatistic, updatedAt: new Date() })
     .where(eq(quizStatistics.id, quizStatisticId!))
     .returning();
    return { quizStatistic: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizStatistic = async (id: QuizStatisticId) => {
  const { id: quizStatisticId } = quizStatisticIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizStatistics).where(eq(quizStatistics.id, quizStatisticId!))
    .returning();
    return { quizStatistic: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

