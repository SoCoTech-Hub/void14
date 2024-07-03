import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  SurveyAnswerId, 
  NewSurveyAnswerParams,
  UpdateSurveyAnswerParams, 
  updateSurveyAnswerSchema,
  insertSurveyAnswerSchema, 
  surveyAnswers,
  surveyAnswerIdSchema 
} from "@/lib/db/schema/surveyAnswers";
import { getUserAuth } from "@/lib/auth/utils";

export const createSurveyAnswer = async (surveyAnswer: NewSurveyAnswerParams) => {
  const { session } = await getUserAuth();
  const newSurveyAnswer = insertSurveyAnswerSchema.parse({ ...surveyAnswer, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(surveyAnswers).values(newSurveyAnswer).returning();
    return { surveyAnswer: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSurveyAnswer = async (id: SurveyAnswerId, surveyAnswer: UpdateSurveyAnswerParams) => {
  const { session } = await getUserAuth();
  const { id: surveyAnswerId } = surveyAnswerIdSchema.parse({ id });
  const newSurveyAnswer = updateSurveyAnswerSchema.parse({ ...surveyAnswer, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(surveyAnswers)
     .set({...newSurveyAnswer, updatedAt: new Date() })
     .where(and(eq(surveyAnswers.id, surveyAnswerId!), eq(surveyAnswers.userId, session?.user.id!)))
     .returning();
    return { surveyAnswer: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSurveyAnswer = async (id: SurveyAnswerId) => {
  const { session } = await getUserAuth();
  const { id: surveyAnswerId } = surveyAnswerIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(surveyAnswers).where(and(eq(surveyAnswers.id, surveyAnswerId!), eq(surveyAnswers.userId, session?.user.id!)))
    .returning();
    return { surveyAnswer: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

