import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type QuestionDdwtoId, 
  type NewQuestionDdwtoParams,
  type UpdateQuestionDdwtoParams, 
  updateQuestionDdwtoSchema,
  insertQuestionDdwtoSchema, 
  questionDdwtos,
  questionDdwtoIdSchema 
} from "@/lib/db/schema/questionDdwtos";

export const createQuestionDdwto = async (questionDdwto: NewQuestionDdwtoParams) => {
  const newQuestionDdwto = insertQuestionDdwtoSchema.parse(questionDdwto);
  try {
    const [q] =  await db.insert(questionDdwtos).values(newQuestionDdwto).returning();
    return { questionDdwto: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionDdwto = async (id: QuestionDdwtoId, questionDdwto: UpdateQuestionDdwtoParams) => {
  const { id: questionDdwtoId } = questionDdwtoIdSchema.parse({ id });
  const newQuestionDdwto = updateQuestionDdwtoSchema.parse(questionDdwto);
  try {
    const [q] =  await db
     .update(questionDdwtos)
     .set(newQuestionDdwto)
     .where(eq(questionDdwtos.id, questionDdwtoId!))
     .returning();
    return { questionDdwto: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionDdwto = async (id: QuestionDdwtoId) => {
  const { id: questionDdwtoId } = questionDdwtoIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionDdwtos).where(eq(questionDdwtos.id, questionDdwtoId!))
    .returning();
    return { questionDdwto: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

