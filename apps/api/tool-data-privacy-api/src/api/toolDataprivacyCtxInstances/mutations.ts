import { db } from "@soco/tool-data-privacy-db/index";
import { and, eq } from "drizzle-orm";
import { 
  ToolDataprivacyCtxInstanceId, 
  NewToolDataprivacyCtxInstanceParams,
  UpdateToolDataprivacyCtxInstanceParams, 
  updateToolDataprivacyCtxInstanceSchema,
  insertToolDataprivacyCtxInstanceSchema, 
  toolDataprivacyCtxInstances,
  toolDataprivacyCtxInstanceIdSchema 
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxInstances";
import { getUserAuth } from "@/lib/auth/utils";

export const createToolDataprivacyCtxInstance = async (toolDataprivacyCtxInstance: NewToolDataprivacyCtxInstanceParams) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyCtxInstance = insertToolDataprivacyCtxInstanceSchema.parse({ ...toolDataprivacyCtxInstance, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(toolDataprivacyCtxInstances).values(newToolDataprivacyCtxInstance).returning();
    return { toolDataprivacyCtxInstance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyCtxInstance = async (id: ToolDataprivacyCtxInstanceId, toolDataprivacyCtxInstance: UpdateToolDataprivacyCtxInstanceParams) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxInstanceId } = toolDataprivacyCtxInstanceIdSchema.parse({ id });
  const newToolDataprivacyCtxInstance = updateToolDataprivacyCtxInstanceSchema.parse({ ...toolDataprivacyCtxInstance, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(toolDataprivacyCtxInstances)
     .set({...newToolDataprivacyCtxInstance, updatedAt: new Date() })
     .where(and(eq(toolDataprivacyCtxInstances.id, toolDataprivacyCtxInstanceId!), eq(toolDataprivacyCtxInstances.userId, session?.user.id!)))
     .returning();
    return { toolDataprivacyCtxInstance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyCtxInstance = async (id: ToolDataprivacyCtxInstanceId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxInstanceId } = toolDataprivacyCtxInstanceIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolDataprivacyCtxInstances).where(and(eq(toolDataprivacyCtxInstances.id, toolDataprivacyCtxInstanceId!), eq(toolDataprivacyCtxInstances.userId, session?.user.id!)))
    .returning();
    return { toolDataprivacyCtxInstance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

