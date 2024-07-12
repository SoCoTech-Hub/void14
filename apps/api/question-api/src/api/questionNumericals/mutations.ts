import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { 
  type QuestionNumericalId, 
  type NewQuestionNumericalParams,
  type UpdateQuestionNumericalParams, 
  updateQuestionNumericalSchema,
  insertQuestionNumericalSchema, 
  questionNumericals,
  questionNumericalIdSchema 
} from "@soco/question-db/schema/questionNumericals";

export const createQuestionNumerical = async (questionNumerical: NewQuestionNumericalParams) => {
  const newQuestionNumerical = insertQuestionNumericalSchema.parse(questionNumerical);
  try {
    const [q] =  await db.insert(questionNumericals).values(newQuestionNumerical).returning();
    return { questionNumerical: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionNumerical = async (id: QuestionNumericalId, questionNumerical: UpdateQuestionNumericalParams) => {
  const { id: questionNumericalId } = questionNumericalIdSchema.parse({ id });
  const newQuestionNumerical = updateQuestionNumericalSchema.parse(questionNumerical);
  try {
    const [q] =  await db
     .update(questionNumericals)
     .set(newQuestionNumerical)
     .where(eq(questionNumericals.id, questionNumericalId!))
     .returning();
    return { questionNumerical: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionNumerical = async (id: QuestionNumericalId) => {
  const { id: questionNumericalId } = questionNumericalIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionNumericals).where(eq(questionNumericals.id, questionNumericalId!))
    .returning();
    return { questionNumerical: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

