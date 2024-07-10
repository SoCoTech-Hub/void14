import { db } from "@soco/tool-monitor-db/client";
import { eq, and } from "@soco/tool-monitor-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolMonitorRuleId, toolMonitorRuleIdSchema, toolMonitorRules } from "@soco/tool-monitor-db/schema/toolMonitorRules";

export const getToolMonitorRules = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(toolMonitorRules).where(eq(toolMonitorRules.userId, session?.user.id!));
  const t = rows
  return { toolMonitorRules: t };
};

export const getToolMonitorRuleById = async (id: ToolMonitorRuleId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorRuleId } = toolMonitorRuleIdSchema.parse({ id });
  const [row] = await db.select().from(toolMonitorRules).where(and(eq(toolMonitorRules.id, toolMonitorRuleId), eq(toolMonitorRules.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { toolMonitorRule: t };
};


