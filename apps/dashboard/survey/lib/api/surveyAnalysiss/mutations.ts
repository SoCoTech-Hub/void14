import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type SurveyAnalysissId, 
  type NewSurveyAnalysissParams,
  type UpdateSurveyAnalysissParams, 
  updateSurveyAnalysissSchema,
  insertSurveyAnalysissSchema, 
  surveyAnalysiss,
  surveyAnalysissIdSchema 
} from "@/lib/db/schema/surveyAnalysiss";
import { getUserAuth } from "@/lib/auth/utils";

export const createSurveyAnalysiss = async (surveyAnalysiss: NewSurveyAnalysissParams) => {
  const { session } = await getUserAuth();
  const newSurveyAnalysiss = insertSurveyAnalysissSchema.parse({ ...surveyAnalysiss, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(surveyAnalysiss).values(newSurveyAnalysiss).returning();
    return { surveyAnalysiss: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSurveyAnalysiss = async (id: SurveyAnalysissId, surveyAnalysiss: UpdateSurveyAnalysissParams) => {
  const { session } = await getUserAuth();
  const { id: surveyAnalysissId } = surveyAnalysissIdSchema.parse({ id });
  const newSurveyAnalysiss = updateSurveyAnalysissSchema.parse({ ...surveyAnalysiss, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(surveyAnalysiss)
     .set(newSurveyAnalysiss)
     .where(and(eq(surveyAnalysiss.id, surveyAnalysissId!), eq(surveyAnalysiss.userId, session?.user.id!)))
     .returning();
    return { surveyAnalysiss: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSurveyAnalysiss = async (id: SurveyAnalysissId) => {
  const { session } = await getUserAuth();
  const { id: surveyAnalysissId } = surveyAnalysissIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(surveyAnalysiss).where(and(eq(surveyAnalysiss.id, surveyAnalysissId!), eq(surveyAnalysiss.userId, session?.user.id!)))
    .returning();
    return { surveyAnalysiss: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

