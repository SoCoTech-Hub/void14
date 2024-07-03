import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  ToolCohortRoleId, 
  NewToolCohortRoleParams,
  UpdateToolCohortRoleParams, 
  updateToolCohortRoleSchema,
  insertToolCohortRoleSchema, 
  toolCohortRoles,
  toolCohortRoleIdSchema 
} from "@/lib/db/schema/toolCohortRoles";
import { getUserAuth } from "@/lib/auth/utils";

export const createToolCohortRole = async (toolCohortRole: NewToolCohortRoleParams) => {
  const { session } = await getUserAuth();
  const newToolCohortRole = insertToolCohortRoleSchema.parse({ ...toolCohortRole, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(toolCohortRoles).values(newToolCohortRole).returning();
    return { toolCohortRole: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolCohortRole = async (id: ToolCohortRoleId, toolCohortRole: UpdateToolCohortRoleParams) => {
  const { session } = await getUserAuth();
  const { id: toolCohortRoleId } = toolCohortRoleIdSchema.parse({ id });
  const newToolCohortRole = updateToolCohortRoleSchema.parse({ ...toolCohortRole, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(toolCohortRoles)
     .set({...newToolCohortRole, updatedAt: new Date() })
     .where(and(eq(toolCohortRoles.id, toolCohortRoleId!), eq(toolCohortRoles.userId, session?.user.id!)))
     .returning();
    return { toolCohortRole: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolCohortRole = async (id: ToolCohortRoleId) => {
  const { session } = await getUserAuth();
  const { id: toolCohortRoleId } = toolCohortRoleIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolCohortRoles).where(and(eq(toolCohortRoles.id, toolCohortRoleId!), eq(toolCohortRoles.userId, session?.user.id!)))
    .returning();
    return { toolCohortRole: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

