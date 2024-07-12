import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { 
  type QuestionCalculatedOptionId, 
  type NewQuestionCalculatedOptionParams,
  type UpdateQuestionCalculatedOptionParams, 
  updateQuestionCalculatedOptionSchema,
  insertQuestionCalculatedOptionSchema, 
  questionCalculatedOptions,
  questionCalculatedOptionIdSchema 
} from "@soco/question-db/schema/questionCalculatedOptions";

export const createQuestionCalculatedOption = async (questionCalculatedOption: NewQuestionCalculatedOptionParams) => {
  const newQuestionCalculatedOption = insertQuestionCalculatedOptionSchema.parse(questionCalculatedOption);
  try {
    const [q] =  await db.insert(questionCalculatedOptions).values(newQuestionCalculatedOption).returning();
    return { questionCalculatedOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionCalculatedOption = async (id: QuestionCalculatedOptionId, questionCalculatedOption: UpdateQuestionCalculatedOptionParams) => {
  const { id: questionCalculatedOptionId } = questionCalculatedOptionIdSchema.parse({ id });
  const newQuestionCalculatedOption = updateQuestionCalculatedOptionSchema.parse(questionCalculatedOption);
  try {
    const [q] =  await db
     .update(questionCalculatedOptions)
     .set(newQuestionCalculatedOption)
     .where(eq(questionCalculatedOptions.id, questionCalculatedOptionId!))
     .returning();
    return { questionCalculatedOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionCalculatedOption = async (id: QuestionCalculatedOptionId) => {
  const { id: questionCalculatedOptionId } = questionCalculatedOptionIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionCalculatedOptions).where(eq(questionCalculatedOptions.id, questionCalculatedOptionId!))
    .returning();
    return { questionCalculatedOption: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

