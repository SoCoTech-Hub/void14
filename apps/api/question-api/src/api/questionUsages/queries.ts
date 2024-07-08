import { db } from "@soco/question-db/index";
import { eq } from "drizzle-orm";
import { type QuestionUsageId, questionUsageIdSchema, questionUsages } from "@soco/question-db/schema/questionUsages";

export const getQuestionUsages = async () => {
  const rows = await db.select().from(questionUsages);
  const q = rows
  return { questionUsages: q };
};

export const getQuestionUsageById = async (id: QuestionUsageId) => {
  const { id: questionUsageId } = questionUsageIdSchema.parse({ id });
  const [row] = await db.select().from(questionUsages).where(eq(questionUsages.id, questionUsageId));
  if (row === undefined) return {};
  const q = row;
  return { questionUsage: q };
};


