import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type ToolDataprivacyCtxLevelId, 
  type NewToolDataprivacyCtxLevelParams,
  type UpdateToolDataprivacyCtxLevelParams, 
  updateToolDataprivacyCtxLevelSchema,
  insertToolDataprivacyCtxLevelSchema, 
  toolDataprivacyCtxLevels,
  toolDataprivacyCtxLevelIdSchema 
} from "@/lib/db/schema/toolDataprivacyCtxLevels";
import { getUserAuth } from "@/lib/auth/utils";

export const createToolDataprivacyCtxLevel = async (toolDataprivacyCtxLevel: NewToolDataprivacyCtxLevelParams) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyCtxLevel = insertToolDataprivacyCtxLevelSchema.parse({ ...toolDataprivacyCtxLevel, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(toolDataprivacyCtxLevels).values(newToolDataprivacyCtxLevel).returning();
    return { toolDataprivacyCtxLevel: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyCtxLevel = async (id: ToolDataprivacyCtxLevelId, toolDataprivacyCtxLevel: UpdateToolDataprivacyCtxLevelParams) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxLevelId } = toolDataprivacyCtxLevelIdSchema.parse({ id });
  const newToolDataprivacyCtxLevel = updateToolDataprivacyCtxLevelSchema.parse({ ...toolDataprivacyCtxLevel, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(toolDataprivacyCtxLevels)
     .set({...newToolDataprivacyCtxLevel, updatedAt: new Date() })
     .where(and(eq(toolDataprivacyCtxLevels.id, toolDataprivacyCtxLevelId!), eq(toolDataprivacyCtxLevels.userId, session?.user.id!)))
     .returning();
    return { toolDataprivacyCtxLevel: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyCtxLevel = async (id: ToolDataprivacyCtxLevelId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxLevelId } = toolDataprivacyCtxLevelIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolDataprivacyCtxLevels).where(and(eq(toolDataprivacyCtxLevels.id, toolDataprivacyCtxLevelId!), eq(toolDataprivacyCtxLevels.userId, session?.user.id!)))
    .returning();
    return { toolDataprivacyCtxLevel: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

