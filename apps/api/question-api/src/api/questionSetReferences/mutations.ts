import { db } from "@soco/question-db/index";
import { eq } from "drizzle-orm";
import { 
  QuestionSetReferenceId, 
  NewQuestionSetReferenceParams,
  UpdateQuestionSetReferenceParams, 
  updateQuestionSetReferenceSchema,
  insertQuestionSetReferenceSchema, 
  questionSetReferences,
  questionSetReferenceIdSchema 
} from "@soco/question-db/schema/questionSetReferences";

export const createQuestionSetReference = async (questionSetReference: NewQuestionSetReferenceParams) => {
  const newQuestionSetReference = insertQuestionSetReferenceSchema.parse(questionSetReference);
  try {
    const [q] =  await db.insert(questionSetReferences).values(newQuestionSetReference).returning();
    return { questionSetReference: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionSetReference = async (id: QuestionSetReferenceId, questionSetReference: UpdateQuestionSetReferenceParams) => {
  const { id: questionSetReferenceId } = questionSetReferenceIdSchema.parse({ id });
  const newQuestionSetReference = updateQuestionSetReferenceSchema.parse(questionSetReference);
  try {
    const [q] =  await db
     .update(questionSetReferences)
     .set(newQuestionSetReference)
     .where(eq(questionSetReferences.id, questionSetReferenceId!))
     .returning();
    return { questionSetReference: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionSetReference = async (id: QuestionSetReferenceId) => {
  const { id: questionSetReferenceId } = questionSetReferenceIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionSetReferences).where(eq(questionSetReferences.id, questionSetReferenceId!))
    .returning();
    return { questionSetReference: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

