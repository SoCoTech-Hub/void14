import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ToolMonitorRuleId, toolMonitorRuleIdSchema, toolMonitorRules } from "@/lib/db/schema/toolMonitorRules";

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


