import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  QuestionResponseCountId, 
  NewQuestionResponseCountParams,
  UpdateQuestionResponseCountParams, 
  updateQuestionResponseCountSchema,
  insertQuestionResponseCountSchema, 
  questionResponseCounts,
  questionResponseCountIdSchema 
} from "@/lib/db/schema/questionResponseCounts";

export const createQuestionResponseCount = async (questionResponseCount: NewQuestionResponseCountParams) => {
  const newQuestionResponseCount = insertQuestionResponseCountSchema.parse(questionResponseCount);
  try {
    const [q] =  await db.insert(questionResponseCounts).values(newQuestionResponseCount).returning();
    return { questionResponseCount: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionResponseCount = async (id: QuestionResponseCountId, questionResponseCount: UpdateQuestionResponseCountParams) => {
  const { id: questionResponseCountId } = questionResponseCountIdSchema.parse({ id });
  const newQuestionResponseCount = updateQuestionResponseCountSchema.parse(questionResponseCount);
  try {
    const [q] =  await db
     .update(questionResponseCounts)
     .set(newQuestionResponseCount)
     .where(eq(questionResponseCounts.id, questionResponseCountId!))
     .returning();
    return { questionResponseCount: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionResponseCount = async (id: QuestionResponseCountId) => {
  const { id: questionResponseCountId } = questionResponseCountIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionResponseCounts).where(eq(questionResponseCounts.id, questionResponseCountId!))
    .returning();
    return { questionResponseCount: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

