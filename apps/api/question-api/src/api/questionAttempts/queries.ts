import type { QuestionAttemptId } from "@soco/question-db/schema/questionAttempts";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import {
  questionAttemptIdSchema,
  questionAttempts,
} from "@soco/question-db/schema/questionAttempts";
import { questions } from "@soco/question-db/schema/questions";
import { questionUsages } from "@soco/question-db/schema/questionUsages";

export const getQuestionAttempts = async () => {
  const rows = await db
    .select({
      questionAttempt: questionAttempts,
      question: questions,
      questionUsage: questionUsages,
    })
    .from(questionAttempts)
    .leftJoin(questions, eq(questionAttempts.questionId, questions.id))
    .leftJoin(
      questionUsages,
      eq(questionAttempts.questionUsageId, questionUsages.id),
    );
  const q = rows.map((r) => ({
    ...r.questionAttempt,
    question: r.question,
    questionUsage: r.questionUsage,
  }));
  return { questionAttempts: q };
};

export const getQuestionAttemptById = async (id: QuestionAttemptId) => {
  const { id: questionAttemptId } = questionAttemptIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionAttempt: questionAttempts,
      question: questions,
      questionUsage: questionUsages,
    })
    .from(questionAttempts)
    .where(eq(questionAttempts.id, questionAttemptId))
    .leftJoin(questions, eq(questionAttempts.questionId, questions.id))
    .leftJoin(
      questionUsages,
      eq(questionAttempts.questionUsageId, questionUsages.id),
    );
  if (row === undefined) return {};
  const q = {
    ...row.questionAttempt,
    question: row.question,
    questionUsage: row.questionUsage,
  };
  return { questionAttempt: q };
};
