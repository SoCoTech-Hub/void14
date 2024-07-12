import type { QuizReportId } from "@soco/quiz-db/schema/quizReports";
import { eq } from "@soco/quiz-db";
import { db } from "@soco/quiz-db/client";
import {
  quizReportIdSchema,
  quizReports,
} from "@soco/quiz-db/schema/quizReports";

export const getQuizReports = async () => {
  const rows = await db.select().from(quizReports);
  const q = rows;
  return { quizReports: q };
};

export const getQuizReportById = async (id: QuizReportId) => {
  const { id: quizReportId } = quizReportIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(quizReports)
    .where(eq(quizReports.id, quizReportId));
  if (row === undefined) return {};
  const q = row;
  return { quizReport: q };
};
