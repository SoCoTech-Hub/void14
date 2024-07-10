import { db } from "@soco/question-db/client";
import { eq, and } from "@soco/question-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type QuestionId, questionIdSchema, questions } from "@soco/question-db/schema/questions";

export const getQuestions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(questions).where(eq(questions.userId, session?.user.id!));
  const q = rows
  return { questions: q };
};

export const getQuestionById = async (id: QuestionId) => {
  const { session } = await getUserAuth();
  const { id: questionId } = questionIdSchema.parse({ id });
  const [row] = await db.select().from(questions).where(and(eq(questions.id, questionId), eq(questions.userId, session?.user.id!)));
  if (row === undefined) return {};
  const q = row;
  return { question: q };
};


