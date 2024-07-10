import { db } from "@soco/question-db/client";
import { eq } from "@soco/question-db";
import { 
  QuestionReferenceId, 
  NewQuestionReferenceParams,
  UpdateQuestionReferenceParams, 
  updateQuestionReferenceSchema,
  insertQuestionReferenceSchema, 
  questionReferences,
  questionReferenceIdSchema 
} from "@soco/question-db/schema/questionReferences";

export const createQuestionReference = async (questionReference: NewQuestionReferenceParams) => {
  const newQuestionReference = insertQuestionReferenceSchema.parse(questionReference);
  try {
    const [q] =  await db.insert(questionReferences).values(newQuestionReference).returning();
    return { questionReference: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionReference = async (id: QuestionReferenceId, questionReference: UpdateQuestionReferenceParams) => {
  const { id: questionReferenceId } = questionReferenceIdSchema.parse({ id });
  const newQuestionReference = updateQuestionReferenceSchema.parse(questionReference);
  try {
    const [q] =  await db
     .update(questionReferences)
     .set(newQuestionReference)
     .where(eq(questionReferences.id, questionReferenceId!))
     .returning();
    return { questionReference: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionReference = async (id: QuestionReferenceId) => {
  const { id: questionReferenceId } = questionReferenceIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionReferences).where(eq(questionReferences.id, questionReferenceId!))
    .returning();
    return { questionReference: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

