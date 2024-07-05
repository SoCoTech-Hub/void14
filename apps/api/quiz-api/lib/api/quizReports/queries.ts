import { eq } from "drizzle-orm";

import type { QuizReportId } from "../../db/schema/quizReports";
import { db } from "../../db/index";
import { quizReportIdSchema, quizReports } from "../../db/schema/quizReports";

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
