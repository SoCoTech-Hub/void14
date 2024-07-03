import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuizOverviewRegradeId, quizOverviewRegradeIdSchema, quizOverviewRegrades } from "@/lib/db/schema/quizOverviewRegrades";

export const getQuizOverviewRegrades = async () => {
  const rows = await db.select().from(quizOverviewRegrades);
  const q = rows
  return { quizOverviewRegrades: q };
};

export const getQuizOverviewRegradeById = async (id: QuizOverviewRegradeId) => {
  const { id: quizOverviewRegradeId } = quizOverviewRegradeIdSchema.parse({ id });
  const [row] = await db.select().from(quizOverviewRegrades).where(eq(quizOverviewRegrades.id, quizOverviewRegradeId));
  if (row === undefined) return {};
  const q = row;
  return { quizOverviewRegrade: q };
};


