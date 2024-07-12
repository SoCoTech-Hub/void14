import type { QuizId } from "@soco/quiz-db/schema/quizes";
import { eq } from "@soco/quiz-db";
import { db } from "@soco/quiz-db/client";
import { quizes, quizIdSchema } from "@soco/quiz-db/schema/quizes";

export const getQuizes = async () => {
  const rows = await db.select().from(quizes);
  const q = rows;
  return { quizes: q };
};

export const getQuizeById = async (id: QuizId) => {
  const { id: quizId } = quizIdSchema.parse({ id });
  const [row] = await db.select().from(quizes).where(eq(quizes.id, quizId));
  if (row === undefined) return {};
  const q = row;
  return { quize: q };
};
