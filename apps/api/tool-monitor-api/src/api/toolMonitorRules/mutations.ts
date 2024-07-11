import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/tool-monitor-db";
import { db } from "@soco/tool-monitor-db/client";
import {
  insertToolMonitorRuleSchema,
  NewToolMonitorRuleParams,
  ToolMonitorRuleId,
  toolMonitorRuleIdSchema,
  toolMonitorRules,
  UpdateToolMonitorRuleParams,
  updateToolMonitorRuleSchema,
} from "@soco/tool-monitor-db/schema/toolMonitorRules";

export const createToolMonitorRule = async (
  toolMonitorRule: NewToolMonitorRuleParams,
) => {
  const { session } = await getUserAuth();
  const newToolMonitorRule = insertToolMonitorRuleSchema.parse({
    ...toolMonitorRule,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(toolMonitorRules)
      .values(newToolMonitorRule)
      .returning();
    return { toolMonitorRule: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolMonitorRule = async (
  id: ToolMonitorRuleId,
  toolMonitorRule: UpdateToolMonitorRuleParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorRuleId } = toolMonitorRuleIdSchema.parse({ id });
  const newToolMonitorRule = updateToolMonitorRuleSchema.parse({
    ...toolMonitorRule,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(toolMonitorRules)
      .set({ ...newToolMonitorRule, updatedAt: new Date() })
      .where(
        and(
          eq(toolMonitorRules.id, toolMonitorRuleId!),
          eq(toolMonitorRules.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolMonitorRule: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolMonitorRule = async (id: ToolMonitorRuleId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorRuleId } = toolMonitorRuleIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolMonitorRules)
      .where(
        and(
          eq(toolMonitorRules.id, toolMonitorRuleId!),
          eq(toolMonitorRules.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolMonitorRule: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
