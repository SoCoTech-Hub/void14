import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  QuizReportId, 
  NewQuizReportParams,
  UpdateQuizReportParams, 
  updateQuizReportSchema,
  insertQuizReportSchema, 
  quizReports,
  quizReportIdSchema 
} from "@/lib/db/schema/quizReports";

export const createQuizReport = async (quizReport: NewQuizReportParams) => {
  const newQuizReport = insertQuizReportSchema.parse(quizReport);
  try {
    const [q] =  await db.insert(quizReports).values(newQuizReport).returning();
    return { quizReport: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuizReport = async (id: QuizReportId, quizReport: UpdateQuizReportParams) => {
  const { id: quizReportId } = quizReportIdSchema.parse({ id });
  const newQuizReport = updateQuizReportSchema.parse(quizReport);
  try {
    const [q] =  await db
     .update(quizReports)
     .set(newQuizReport)
     .where(eq(quizReports.id, quizReportId!))
     .returning();
    return { quizReport: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuizReport = async (id: QuizReportId) => {
  const { id: quizReportId } = quizReportIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(quizReports).where(eq(quizReports.id, quizReportId!))
    .returning();
    return { quizReport: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

