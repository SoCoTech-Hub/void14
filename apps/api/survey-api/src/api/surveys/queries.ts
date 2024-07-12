import type { SurveyId } from "@soco/survey-db/schema/surveys";
import { eq } from "@soco/survey-db";
import { db } from "@soco/survey-db/client";
import { surveyIdSchema, surveys } from "@soco/survey-db/schema/surveys";

export const getSurveys = async () => {
  const rows = await db.select().from(surveys);
  const s = rows;
  return { surveys: s };
};

export const getSurveyById = async (id: SurveyId) => {
  const { id: surveyId } = surveyIdSchema.parse({ id });
  const [row] = await db.select().from(surveys).where(eq(surveys.id, surveyId));
  if (row === undefined) return {};
  const s = row;
  return { survey: s };
};
