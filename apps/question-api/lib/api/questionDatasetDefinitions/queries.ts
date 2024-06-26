import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type QuestionDatasetDefinitionId, questionDatasetDefinitionIdSchema, questionDatasetDefinitions } from "@/lib/db/schema/questionDatasetDefinitions";
import { questionCategories } from "@/lib/db/schema/questionCategories";

export const getQuestionDatasetDefinitions = async () => {
  const rows = await db.select({ questionDatasetDefinition: questionDatasetDefinitions, questionCategory: questionCategories }).from(questionDatasetDefinitions).leftJoin(questionCategories, eq(questionDatasetDefinitions.questionCategoryId, questionCategories.id));
  const q = rows .map((r) => ({ ...r.questionDatasetDefinition, questionCategory: r.questionCategory})); 
  return { questionDatasetDefinitions: q };
};

export const getQuestionDatasetDefinitionById = async (id: QuestionDatasetDefinitionId) => {
  const { id: questionDatasetDefinitionId } = questionDatasetDefinitionIdSchema.parse({ id });
  const [row] = await db.select({ questionDatasetDefinition: questionDatasetDefinitions, questionCategory: questionCategories }).from(questionDatasetDefinitions).where(eq(questionDatasetDefinitions.id, questionDatasetDefinitionId)).leftJoin(questionCategories, eq(questionDatasetDefinitions.questionCategoryId, questionCategories.id));
  if (row === undefined) return {};
  const q =  { ...row.questionDatasetDefinition, questionCategory: row.questionCategory } ;
  return { questionDatasetDefinition: q };
};


