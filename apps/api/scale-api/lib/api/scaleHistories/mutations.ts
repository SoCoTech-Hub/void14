import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ScaleHistoryId, 
  NewScaleHistoryParams,
  UpdateScaleHistoryParams, 
  updateScaleHistorySchema,
  insertScaleHistorySchema, 
  scaleHistories,
  scaleHistoryIdSchema 
} from "@/lib/db/schema/scaleHistories";
import { getUserAuth } from "@soco/auth/utils";

export const createScaleHistory = async (scaleHistory: NewScaleHistoryParams) => {
  const { session } = await getUserAuth();
  const newScaleHistory = insertScaleHistorySchema.parse({ ...scaleHistory, userId: session?.user.id! });
  try {
    const [s] =  await db.insert(scaleHistories).values(newScaleHistory).returning();
    return { scaleHistory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScaleHistory = async (id: ScaleHistoryId, scaleHistory: UpdateScaleHistoryParams) => {
  const { session } = await getUserAuth();
  const { id: scaleHistoryId } = scaleHistoryIdSchema.parse({ id });
  const newScaleHistory = updateScaleHistorySchema.parse({ ...scaleHistory, userId: session?.user.id! });
  try {
    const [s] =  await db
     .update(scaleHistories)
     .set({...newScaleHistory, updatedAt: new Date() })
     .where(and(eq(scaleHistories.id, scaleHistoryId!), eq(scaleHistories.userId, session?.user.id!)))
     .returning();
    return { scaleHistory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScaleHistory = async (id: ScaleHistoryId) => {
  const { session } = await getUserAuth();
  const { id: scaleHistoryId } = scaleHistoryIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scaleHistories).where(and(eq(scaleHistories.id, scaleHistoryId!), eq(scaleHistories.userId, session?.user.id!)))
    .returning();
    return { scaleHistory: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

