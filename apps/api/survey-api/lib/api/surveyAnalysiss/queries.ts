import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { SurveyAnalysissId } from "../../db/schema/surveyAnalysiss";
import { db } from "../../db/index";
import {
  surveyAnalysiss,
  surveyAnalysissIdSchema,
} from "../../db/schema/surveyAnalysiss";
import { surveys } from "../../db/schema/surveys";

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
