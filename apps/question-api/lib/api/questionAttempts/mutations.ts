import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  QuestionAttemptId, 
  NewQuestionAttemptParams,
  UpdateQuestionAttemptParams, 
  updateQuestionAttemptSchema,
  insertQuestionAttemptSchema, 
  questionAttempts,
  questionAttemptIdSchema 
} from "@/lib/db/schema/questionAttempts";

export const createQuestionAttempt = async (questionAttempt: NewQuestionAttemptParams) => {
  const newQuestionAttempt = insertQuestionAttemptSchema.parse(questionAttempt);
  try {
    const [q] =  await db.insert(questionAttempts).values(newQuestionAttempt).returning();
    return { questionAttempt: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionAttempt = async (id: QuestionAttemptId, questionAttempt: UpdateQuestionAttemptParams) => {
  const { id: questionAttemptId } = questionAttemptIdSchema.parse({ id });
  const newQuestionAttempt = updateQuestionAttemptSchema.parse(questionAttempt);
  try {
    const [q] =  await db
     .update(questionAttempts)
     .set({...newQuestionAttempt, updatedAt: new Date() })
     .where(eq(questionAttempts.id, questionAttemptId!))
     .returning();
    return { questionAttempt: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionAttempt = async (id: QuestionAttemptId) => {
  const { id: questionAttemptId } = questionAttemptIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionAttempts).where(eq(questionAttempts.id, questionAttemptId!))
    .returning();
    return { questionAttempt: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

