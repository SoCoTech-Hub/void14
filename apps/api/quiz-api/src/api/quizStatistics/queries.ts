import { db } from "@soco/quiz-db/client";
import { eq } from "@soco/quiz-db";
import { type QuizStatisticId, quizStatisticIdSchema, quizStatistics } from "@soco/quiz-db/schema/quizStatistics";

export const getQuizStatistics = async () => {
  const rows = await db.select().from(quizStatistics);
  const q = rows
  return { quizStatistics: q };
};

export const getQuizStatisticById = async (id: QuizStatisticId) => {
  const { id: quizStatisticId } = quizStatisticIdSchema.parse({ id });
  const [row] = await db.select().from(quizStatistics).where(eq(quizStatistics.id, quizStatisticId));
  if (row === undefined) return {};
  const q = row;
  return { quizStatistic: q };
};


