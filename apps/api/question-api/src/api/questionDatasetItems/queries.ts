import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { type QuestionDatasetItemId, questionDatasetItemIdSchema, questionDatasetItems } from "@soco/question-db/schema/questionDatasetItems";
import { questionDatasetDefinitions } from "@soco/question-db/schema/questionDatasetDefinitions";

export const getQuestionDatasetItems = async () => {
  const rows = await db.select({ questionDatasetItem: questionDatasetItems, questionDatasetDefinition: questionDatasetDefinitions }).from(questionDatasetItems).leftJoin(questionDatasetDefinitions, eq(questionDatasetItems.questionDatasetDefinitionId, questionDatasetDefinitions.id));
  const q = rows .map((r) => ({ ...r.questionDatasetItem, questionDatasetDefinition: r.questionDatasetDefinition})); 
  return { questionDatasetItems: q };
};

export const getQuestionDatasetItemById = async (id: QuestionDatasetItemId) => {
  const { id: questionDatasetItemId } = questionDatasetItemIdSchema.parse({ id });
  const [row] = await db.select({ questionDatasetItem: questionDatasetItems, questionDatasetDefinition: questionDatasetDefinitions }).from(questionDatasetItems).where(eq(questionDatasetItems.id, questionDatasetItemId)).leftJoin(questionDatasetDefinitions, eq(questionDatasetItems.questionDatasetDefinitionId, questionDatasetDefinitions.id));
  if (row === undefined) return {};
  const q =  { ...row.questionDatasetItem, questionDatasetDefinition: row.questionDatasetDefinition } ;
  return { questionDatasetItem: q };
};


