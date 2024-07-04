import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type QuestionId, questionIdSchema, questions } from "@/lib/db/schema/questions";

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


