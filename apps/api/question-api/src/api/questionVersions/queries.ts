import type { QuestionVersionId } from "@soco/question-db/schema/questionVersions";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import { questionBankEntries } from "@soco/question-db/schema/questionBankEntries";
import { questions } from "@soco/question-db/schema/questions";
import {
  questionVersionIdSchema,
  questionVersions,
} from "@soco/question-db/schema/questionVersions";

export const getQuestionVersions = async () => {
  const rows = await db
    .select({
      questionVersion: questionVersions,
      questionBankEntry: questionBankEntries,
      question: questions,
    })
    .from(questionVersions)
    .leftJoin(
      questionBankEntries,
      eq(questionVersions.questionBankEntryId, questionBankEntries.id),
    )
    .leftJoin(questions, eq(questionVersions.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionVersion,
    questionBankEntry: r.questionBankEntry,
    question: r.question,
  }));
  return { questionVersions: q };
};

export const getQuestionVersionById = async (id: QuestionVersionId) => {
  const { id: questionVersionId } = questionVersionIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionVersion: questionVersions,
      questionBankEntry: questionBankEntries,
      question: questions,
    })
    .from(questionVersions)
    .where(eq(questionVersions.id, questionVersionId))
    .leftJoin(
      questionBankEntries,
      eq(questionVersions.questionBankEntryId, questionBankEntries.id),
    )
    .leftJoin(questions, eq(questionVersions.questionId, questions.id));
  if (row === undefined) return {};
  const q = {
    ...row.questionVersion,
    questionBankEntry: row.questionBankEntry,
    question: row.question,
  };
  return { questionVersion: q };
};
