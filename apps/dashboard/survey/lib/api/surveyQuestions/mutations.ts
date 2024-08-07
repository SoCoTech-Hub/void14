import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type SurveyQuestionId, 
  type NewSurveyQuestionParams,
  type UpdateSurveyQuestionParams, 
  updateSurveyQuestionSchema,
  insertSurveyQuestionSchema, 
  surveyQuestions,
  surveyQuestionIdSchema 
} from "@/lib/db/schema/surveyQuestions";

export const createSurveyQuestion = async (surveyQuestion: NewSurveyQuestionParams) => {
  const newSurveyQuestion = insertSurveyQuestionSchema.parse(surveyQuestion);
  try {
    const [s] =  await db.insert(surveyQuestions).values(newSurveyQuestion).returning();
    return { surveyQuestion: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSurveyQuestion = async (id: SurveyQuestionId, surveyQuestion: UpdateSurveyQuestionParams) => {
  const { id: surveyQuestionId } = surveyQuestionIdSchema.parse({ id });
  const newSurveyQuestion = updateSurveyQuestionSchema.parse(surveyQuestion);
  try {
    const [s] =  await db
     .update(surveyQuestions)
     .set(newSurveyQuestion)
     .where(eq(surveyQuestions.id, surveyQuestionId!))
     .returning();
    return { surveyQuestion: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSurveyQuestion = async (id: SurveyQuestionId) => {
  const { id: surveyQuestionId } = surveyQuestionIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(surveyQuestions).where(eq(surveyQuestions.id, surveyQuestionId!))
    .returning();
    return { surveyQuestion: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

