import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ToolMonitorHistoryId, 
  type NewToolMonitorHistoryParams,
  type UpdateToolMonitorHistoryParams, 
  updateToolMonitorHistorySchema,
  insertToolMonitorHistorySchema, 
  toolMonitorHistories,
  toolMonitorHistoryIdSchema 
} from "@/lib/db/schema/toolMonitorHistories";
import { getUserAuth } from "@/lib/auth/utils";

export const createToolMonitorHistory = async (toolMonitorHistory: NewToolMonitorHistoryParams) => {
  const { session } = await getUserAuth();
  const newToolMonitorHistory = insertToolMonitorHistorySchema.parse({ ...toolMonitorHistory, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(toolMonitorHistories).values(newToolMonitorHistory).returning();
    return { toolMonitorHistory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolMonitorHistory = async (id: ToolMonitorHistoryId, toolMonitorHistory: UpdateToolMonitorHistoryParams) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorHistoryId } = toolMonitorHistoryIdSchema.parse({ id });
  const newToolMonitorHistory = updateToolMonitorHistorySchema.parse({ ...toolMonitorHistory, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(toolMonitorHistories)
     .set({...newToolMonitorHistory, updatedAt: new Date() })
     .where(and(eq(toolMonitorHistories.id, toolMonitorHistoryId!), eq(toolMonitorHistories.userId, session?.user.id!)))
     .returning();
    return { toolMonitorHistory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolMonitorHistory = async (id: ToolMonitorHistoryId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorHistoryId } = toolMonitorHistoryIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolMonitorHistories).where(and(eq(toolMonitorHistories.id, toolMonitorHistoryId!), eq(toolMonitorHistories.userId, session?.user.id!)))
    .returning();
    return { toolMonitorHistory: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

