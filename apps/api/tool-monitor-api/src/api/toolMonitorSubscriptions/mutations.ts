import { db } from "@soco/tool-monitor-db/client";
import { and, eq } from "@soco/tool-monitor-db";
import { 
  type ToolMonitorSubscriptionId, 
  type NewToolMonitorSubscriptionParams,
  type UpdateToolMonitorSubscriptionParams, 
  updateToolMonitorSubscriptionSchema,
  insertToolMonitorSubscriptionSchema, 
  toolMonitorSubscriptions,
  toolMonitorSubscriptionIdSchema 
} from "@soco/tool-monitor-db/schema/toolMonitorSubscriptions";
import { getUserAuth } from "@soco/auth-service";

export const createToolMonitorSubscription = async (toolMonitorSubscription: NewToolMonitorSubscriptionParams) => {
  const { session } = await getUserAuth();
  const newToolMonitorSubscription = insertToolMonitorSubscriptionSchema.parse({ ...toolMonitorSubscription, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(toolMonitorSubscriptions).values(newToolMonitorSubscription).returning();
    return { toolMonitorSubscription: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolMonitorSubscription = async (id: ToolMonitorSubscriptionId, toolMonitorSubscription: UpdateToolMonitorSubscriptionParams) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorSubscriptionId } = toolMonitorSubscriptionIdSchema.parse({ id });
  const newToolMonitorSubscription = updateToolMonitorSubscriptionSchema.parse({ ...toolMonitorSubscription, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(toolMonitorSubscriptions)
     .set({...newToolMonitorSubscription, updatedAt: new Date() })
     .where(and(eq(toolMonitorSubscriptions.id, toolMonitorSubscriptionId!), eq(toolMonitorSubscriptions.userId, session?.user.id!)))
     .returning();
    return { toolMonitorSubscription: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolMonitorSubscription = async (id: ToolMonitorSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorSubscriptionId } = toolMonitorSubscriptionIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolMonitorSubscriptions).where(and(eq(toolMonitorSubscriptions.id, toolMonitorSubscriptionId!), eq(toolMonitorSubscriptions.userId, session?.user.id!)))
    .returning();
    return { toolMonitorSubscription: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

