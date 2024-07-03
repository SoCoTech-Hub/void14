import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  QuestionCategoryId, 
  NewQuestionCategoryParams,
  UpdateQuestionCategoryParams, 
  updateQuestionCategorySchema,
  insertQuestionCategorySchema, 
  questionCategories,
  questionCategoryIdSchema 
} from "@/lib/db/schema/questionCategories";

export const createQuestionCategory = async (questionCategory: NewQuestionCategoryParams) => {
  const newQuestionCategory = insertQuestionCategorySchema.parse(questionCategory);
  try {
    const [q] =  await db.insert(questionCategories).values(newQuestionCategory).returning();
    return { questionCategory: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateQuestionCategory = async (id: QuestionCategoryId, questionCategory: UpdateQuestionCategoryParams) => {
  const { id: questionCategoryId } = questionCategoryIdSchema.parse({ id });
  const newQuestionCategory = updateQuestionCategorySchema.parse(questionCategory);
  try {
    const [q] =  await db
     .update(questionCategories)
     .set(newQuestionCategory)
     .where(eq(questionCategories.id, questionCategoryId!))
     .returning();
    return { questionCategory: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteQuestionCategory = async (id: QuestionCategoryId) => {
  const { id: questionCategoryId } = questionCategoryIdSchema.parse({ id });
  try {
    const [q] =  await db.delete(questionCategories).where(eq(questionCategories.id, questionCategoryId!))
    .returning();
    return { questionCategory: q };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

