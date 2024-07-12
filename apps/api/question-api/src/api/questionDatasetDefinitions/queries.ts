import type { QuestionDatasetDefinitionId } from "@soco/question-db/schema/questionDatasetDefinitions";
import { eq } from "@soco/question-db";
import { db } from "@soco/question-db/client";
import { questionCategories } from "@soco/question-db/schema/questionCategories";
import {
  questionDatasetDefinitionIdSchema,
  questionDatasetDefinitions,
} from "@soco/question-db/schema/questionDatasetDefinitions";

export const getQuestionDatasetDefinitions = async () => {
  const rows = await db
    .select({
      questionDatasetDefinition: questionDatasetDefinitions,
      questionCategory: questionCategories,
    })
    .from(questionDatasetDefinitions)
    .leftJoin(
      questionCategories,
      eq(questionDatasetDefinitions.questionCategoryId, questionCategories.id),
    );
  const q = rows.map((r) => ({
    ...r.questionDatasetDefinition,
    questionCategory: r.questionCategory,
  }));
  return { questionDatasetDefinitions: q };
};

export const getQuestionDatasetDefinitionById = async (
  id: QuestionDatasetDefinitionId,
) => {
  const { id: questionDatasetDefinitionId } =
    questionDatasetDefinitionIdSchema.parse({ id });
  const [row] = await db
    .select({
      questionDatasetDefinition: questionDatasetDefinitions,
      questionCategory: questionCategories,
    })
    .from(questionDatasetDefinitions)
    .where(eq(questionDatasetDefinitions.id, questionDatasetDefinitionId))
    .leftJoin(
      questionCategories,
      eq(questionDatasetDefinitions.questionCategoryId, questionCategories.id),
    );
  if (row === undefined) return {};
  const q = {
    ...row.questionDatasetDefinition,
    questionCategory: row.questionCategory,
  };
  return { questionDatasetDefinition: q };
};
