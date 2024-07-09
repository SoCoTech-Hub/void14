import { and, eq } from "drizzle-orm";

import type { ToolMonitorRuleId } from "@soco/tool-monitor-db/schema/toolMonitorRules";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/tool-monitor-db/index";
import {
  toolMonitorRuleIdSchema,
  toolMonitorRules,
} from "@soco/tool-monitor-db/schema/toolMonitorRules";

export const getToolMonitorRules = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(toolMonitorRules)
    .where(eq(toolMonitorRules.userId, session?.user.id!));
  const t = rows;
  return { toolMonitorRules: t };
};

export const getToolMonitorRuleById = async (id: ToolMonitorRuleId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorRuleId } = toolMonitorRuleIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolMonitorRules)
    .where(
      and(
        eq(toolMonitorRules.id, toolMonitorRuleId),
        eq(toolMonitorRules.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const t = row;
  return { toolMonitorRule: t };
};