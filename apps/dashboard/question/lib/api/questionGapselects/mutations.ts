import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type QuestionGapselectId, 
  type NewQuestionGapselectParams,
  type UpdateQuestionGapselectParams, 
  updateQuestionGapselectSchema,
  insertQuestionGapselectSchema, 
  questionGapselects,
  questionGapselectIdSchema 
} from "@/lib/db/schema/questionGapselects";

export const createQuestionGapselect = async (questionGapselect: NewQuestionGapselectParams) => {
  const newQuestionGapselect = insertQuestionGapselectSchema.parse(questionGapselect);
  try {
    const [q] =  await db.insert(questionGapselects).values(newQuestionGapselect).returning();
    return { questionGapselect: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionGapselect = async (id: QuestionGapselectId, questionGapselect: UpdateQuestionGapselectParams) => {
  const { id: questionGapselectId } = questionGapselectIdSchema.parse({ id });
  const newQuestionGapselect = updateQuestionGapselectSchema.parse(questionGapselect);
  try {
    const [q] =  await db
     .update(questionGapselects)
     .set(newQuestionGapselect)
     .where(eq(questionGapselects.id, questionGapselectId!))
     .returning();
    return { questionGapselect: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionGapselect = async (id: QuestionGapselectId) => {
  const { id: questionGapselectId } = questionGapselectIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionGapselects).where(eq(questionGapselects.id, questionGapselectId!))
    .returning();
    return { questionGapselect: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

