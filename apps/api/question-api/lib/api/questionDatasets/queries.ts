import { eq } from "drizzle-orm";

import type { QuestionDatasetId } from "../../db/schema/questionDatasets";
import { db } from "../../db/index";
import { questionDatasetDefinitions } from "../../db/schema/questionDatasetDefinitions";
import {
  questionDatasetIdSchema,
  questionDatasets,
} from "../../db/schema/questionDatasets";
import { questions } from "../../db/schema/questions";

export const getQuestionDatasets = async () => {
  const rows = await db
    .select({
      questionDataset: questionDatasets,
      questionDatasetDefinition: questionDatasetDefinitions,
      question: questions,
    })
    .from(questionDatasets)
    .leftJoin(
      questionDatasetDefinitions,
      eq(
        questionDatasets.questionDatasetDefinitionId,
        questionDatasetDefinitions.id,
      ),
    )
    .leftJoin(questions, eq(questionDatasets.questionId, questions.id));
  const q = rows.map((r) => ({
    ...r.questionDataset,
    questionDatasetDefinition: r.questionDatasetDefinition,
    question: r.question,
  }));
  return { questionDatasets: q };
};

export const getQuestionDatasetById = async (id: QuestionDatasetId) => {
  const { id: questionDatasetId } = questionDatasetIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionDataset: questionDatasets,
      questionDatasetDefinition: questionDatasetDefinitions,
      question: questions,
    })
    .from(questionDatasets)
    .where(eq(questionDatasets.id, questionDatasetId))
    .leftJoin(
      questionDatasetDefinitions,
      eq(
        questionDatasets.questionDatasetDefinitionId,
        questionDatasetDefinitions.id,
      ),
    )
    .leftJoin(questions, eq(questionDatasets.questionId, questions.id));
  if (row === undefined) return {};
  const q = {
    ...row.questionDataset,
    questionDatasetDefinition: row.questionDatasetDefinition,
    question: row.question,
  };
  return { questionDataset: q };
};
