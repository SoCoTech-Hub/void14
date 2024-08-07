import type { SurveyAnalysissId } from "@soco/survey-db/schema/surveyAnalysiss";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/survey-db";
import { db } from "@soco/survey-db/client";
import {
  surveyAnalysiss,
  surveyAnalysissIdSchema,
} from "@soco/survey-db/schema/surveyAnalysiss";
import { surveys } from "@soco/survey-db/schema/surveys";

export const getSurveyAnalysisses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ surveyAnalysiss: surveyAnalysiss, survey: surveys })
    .from(surveyAnalysiss)
    .leftJoin(surveys, eq(surveyAnalysiss.surveyId, surveys.id))
    .where(eq(surveyAnalysiss.userId, session?.user.id!));
  const s = rows.map((r) => ({ ...r.surveyAnalysiss, survey: r.survey }));
  return { surveyAnalysiss: s };
};

export const getSurveyAnalysissById = async (id: SurveyAnalysissId) => {
  const { session } = await getUserAuth();
  const { id: surveyAnalysissId } = surveyAnalysissIdSchema.parse({ id });
  const [row] = await db
    .select({ surveyAnalysiss: surveyAnalysiss, survey: surveys })
    .from(surveyAnalysiss)
    .where(
      and(
        eq(surveyAnalysiss.id, surveyAnalysissId),
        eq(surveyAnalysiss.userId, session?.user.id!),
      ),
    )
    .leftJoin(surveys, eq(surveyAnalysiss.surveyId, surveys.id));
  if (row === undefined) return {};
  const s = { ...row.surveyAnalysiss, survey: row.survey };
  return { surveyAnalysiss: s };
};
