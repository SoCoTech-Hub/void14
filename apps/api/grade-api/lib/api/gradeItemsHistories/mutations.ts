import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  GradeItemsHistoryId, 
  NewGradeItemsHistoryParams,
  UpdateGradeItemsHistoryParams, 
  updateGradeItemsHistorySchema,
  insertGradeItemsHistorySchema, 
  gradeItemsHistories,
  gradeItemsHistoryIdSchema 
} from "@/lib/db/schema/gradeItemsHistories";
import { getUserAuth } from "@soco/auth/utils";

export const createGradeItemsHistory = async (gradeItemsHistory: NewGradeItemsHistoryParams) => {
  const { session } = await getUserAuth();
  const newGradeItemsHistory = insertGradeItemsHistorySchema.parse({ ...gradeItemsHistory, userId: session?.user.id! });
  try {
    const [g] =  await db.insert(gradeItemsHistories).values(newGradeItemsHistory).returning();
    return { gradeItemsHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeItemsHistory = async (id: GradeItemsHistoryId, gradeItemsHistory: UpdateGradeItemsHistoryParams) => {
  const { session } = await getUserAuth();
  const { id: gradeItemsHistoryId } = gradeItemsHistoryIdSchema.parse({ id });
  const newGradeItemsHistory = updateGradeItemsHistorySchema.parse({ ...gradeItemsHistory, userId: session?.user.id! });
  try {
    const [g] =  await db
     .update(gradeItemsHistories)
     .set({...newGradeItemsHistory, updatedAt: new Date() })
     .where(and(eq(gradeItemsHistories.id, gradeItemsHistoryId!), eq(gradeItemsHistories.userId, session?.user.id!)))
     .returning();
    return { gradeItemsHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeItemsHistory = async (id: GradeItemsHistoryId) => {
  const { session } = await getUserAuth();
  const { id: gradeItemsHistoryId } = gradeItemsHistoryIdSchema.parse({ id });
  try {
    const [g] =  await db.delete(gradeItemsHistories).where(and(eq(gradeItemsHistories.id, gradeItemsHistoryId!), eq(gradeItemsHistories.userId, session?.user.id!)))
    .returning();
    return { gradeItemsHistory: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

