import { db } from "@soco/survey-db/client";
import { eq } from "@soco/survey-db";
import { 
  type SurveyId, 
  type NewSurveyParams,
  type UpdateSurveyParams, 
  updateSurveySchema,
  insertSurveySchema, 
  surveys,
  surveyIdSchema 
} from "@soco/survey-db/schema/surveys";

export const createSurvey = async (survey: NewSurveyParams) => {
  const newSurvey = insertSurveySchema.parse(survey);
  try {
    const [s] =  await db.insert(surveys).values(newSurvey).returning();
    return { survey: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateSurvey = async (id: SurveyId, survey: UpdateSurveyParams) => {
  const { id: surveyId } = surveyIdSchema.parse({ id });
  const newSurvey = updateSurveySchema.parse(survey);
  try {
    const [s] =  await db
     .update(surveys)
     .set({...newSurvey, updatedAt: new Date() })
     .where(eq(surveys.id, surveyId!))
     .returning();
    return { survey: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteSurvey = async (id: SurveyId) => {
  const { id: surveyId } = surveyIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(surveys).where(eq(surveys.id, surveyId!))
    .returning();
    return { survey: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

