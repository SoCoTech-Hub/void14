import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { 
  QuestionUsageId, 
  NewQuestionUsageParams,
  UpdateQuestionUsageParams, 
  updateQuestionUsageSchema,
  insertQuestionUsageSchema, 
  questionUsages,
  questionUsageIdSchema 
} from "@soco/question-db/schema/questionUsages";

export const createQuestionUsage = async (questionUsage: NewQuestionUsageParams) => {
  const newQuestionUsage = insertQuestionUsageSchema.parse(questionUsage);
  try {
    const [q] =  await db.insert(questionUsages).values(newQuestionUsage).returning();
    return { questionUsage: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionUsage = async (id: QuestionUsageId, questionUsage: UpdateQuestionUsageParams) => {
  const { id: questionUsageId } = questionUsageIdSchema.parse({ id });
  const newQuestionUsage = updateQuestionUsageSchema.parse(questionUsage);
  try {
    const [q] =  await db
     .update(questionUsages)
     .set(newQuestionUsage)
     .where(eq(questionUsages.id, questionUsageId!))
     .returning();
    return { questionUsage: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionUsage = async (id: QuestionUsageId) => {
  const { id: questionUsageId } = questionUsageIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionUsages).where(eq(questionUsages.id, questionUsageId!))
    .returning();
    return { questionUsage: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

