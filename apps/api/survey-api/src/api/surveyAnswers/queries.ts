import { db } from "@soco/survey-db/client";
import { eq, and } from "@soco/survey-db";
import { getUserAuth } from "@soco/auth-service";
import { type SurveyAnswerId, surveyAnswerIdSchema, surveyAnswers } from "@soco/survey-db/schema/surveyAnswers";
import { surveyQuestions } from "@soco/survey-db/schema/surveyQuestions";
import { surveys } from "@soco/survey-db/schema/surveys";

export const getSurveyAnswers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ surveyAnswer: surveyAnswers, surveyQuestion: surveyQuestions, survey: surveys }).from(surveyAnswers).leftJoin(surveyQuestions, eq(surveyAnswers.surveyQuestionId, surveyQuestions.id)).leftJoin(surveys, eq(surveyAnswers.surveyId, surveys.id)).where(eq(surveyAnswers.userId, session?.user.id!));
  const s = rows .map((r) => ({ ...r.surveyAnswer, surveyQuestion: r.surveyQuestion, survey: r.survey})); 
  return { surveyAnswers: s };
};

export const getSurveyAnswerById = async (id: SurveyAnswerId) => {
  const { session } = await getUserAuth();
  const { id: surveyAnswerId } = surveyAnswerIdSchema.parse({ id });
  const [row] = await db.select({ surveyAnswer: surveyAnswers, surveyQuestion: surveyQuestions, survey: surveys }).from(surveyAnswers).where(and(eq(surveyAnswers.id, surveyAnswerId), eq(surveyAnswers.userId, session?.user.id!))).leftJoin(surveyQuestions, eq(surveyAnswers.surveyQuestionId, surveyQuestions.id)).leftJoin(surveys, eq(surveyAnswers.surveyId, surveys.id));
  if (row === undefined) return {};
  const s =  { ...row.surveyAnswer, surveyQuestion: row.surveyQuestion, survey: row.survey } ;
  return { surveyAnswer: s };
};


