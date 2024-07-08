import { db } from "@soco/grade-db/index";
import { eq } from "drizzle-orm";
import { 
  GradeCategoriesHistoryId, 
  NewGradeCategoriesHistoryParams,
  UpdateGradeCategoriesHistoryParams, 
  updateGradeCategoriesHistorySchema,
  insertGradeCategoriesHistorySchema, 
  gradeCategoriesHistories,
  gradeCategoriesHistoryIdSchema 
} from "@soco/grade-db/schema/gradeCategoriesHistories";

export const createGradeCategoriesHistory = async (gradeCategoriesHistory: NewGradeCategoriesHistoryParams) => {
  const newGradeCategoriesHistory = insertGradeCategoriesHistorySchema.parse(gradeCategoriesHistory);
  try {
    const [g] =  await db.insert(gradeCategoriesHistories).values(newGradeCategoriesHistory).returning();
    return { gradeCategoriesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeCategoriesHistory = async (id: GradeCategoriesHistoryId, gradeCategoriesHistory: UpdateGradeCategoriesHistoryParams) => {
  const { id: gradeCategoriesHistoryId } = gradeCategoriesHistoryIdSchema.parse({ id });
  const newGradeCategoriesHistory = updateGradeCategoriesHistorySchema.parse(gradeCategoriesHistory);
  try {
    const [g] =  await db
     .update(gradeCategoriesHistories)
     .set({...newGradeCategoriesHistory, updatedAt: new Date() })
     .where(eq(gradeCategoriesHistories.id, gradeCategoriesHistoryId!))
     .returning();
    return { gradeCategoriesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeCategoriesHistory = async (id: GradeCategoriesHistoryId) => {
  const { id: gradeCategoriesHistoryId } = gradeCategoriesHistoryIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeCategoriesHistories).where(eq(gradeCategoriesHistories.id, gradeCategoriesHistoryId!))
    .returning();
    return { gradeCategoriesHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

