import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type SurveyQuestionId, surveyQuestionIdSchema, surveyQuestions } from "@/lib/db/schema/surveyQuestions";

export const getSurveyQuestions = async () => {
  const rows = await db.select().from(surveyQuestions);
  const s = rows
  return { surveyQuestions: s };
};

export const getSurveyQuestionById = async (id: SurveyQuestionId) => {
  const { id: surveyQuestionId } = surveyQuestionIdSchema.parse({ id });
  const [row] = await db.select().from(surveyQuestions).where(eq(surveyQuestions.id, surveyQuestionId));
  if (row === undefined) return {};
  const s = row;
  return { surveyQuestion: s };
};


