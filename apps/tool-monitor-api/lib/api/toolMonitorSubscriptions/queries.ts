import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolMonitorSubscriptionId, toolMonitorSubscriptionIdSchema, toolMonitorSubscriptions } from "@/lib/db/schema/toolMonitorSubscriptions";
import { toolMonitorRules } from "@/lib/db/schema/toolMonitorRules";

export const getToolMonitorSubscriptions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ toolMonitorSubscription: toolMonitorSubscriptions, toolMonitorRule: toolMonitorRules }).from(toolMonitorSubscriptions).leftJoin(toolMonitorRules, eq(toolMonitorSubscriptions.toolMonitorRuleId, toolMonitorRules.id)).where(eq(toolMonitorSubscriptions.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.toolMonitorSubscription, toolMonitorRule: r.toolMonitorRule})); 
  return { toolMonitorSubscriptions: t };
};

export const getToolMonitorSubscriptionById = async (id: ToolMonitorSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorSubscriptionId } = toolMonitorSubscriptionIdSchema.parse({ id });
  const [row] = await db.select({ toolMonitorSubscription: toolMonitorSubscriptions, toolMonitorRule: toolMonitorRules }).from(toolMonitorSubscriptions).where(and(eq(toolMonitorSubscriptions.id, toolMonitorSubscriptionId), eq(toolMonitorSubscriptions.userId, session?.user.id!))).leftJoin(toolMonitorRules, eq(toolMonitorSubscriptions.toolMonitorRuleId, toolMonitorRules.id));
  if (row === undefined) return {};
  const t =  { ...row.toolMonitorSubscription, toolMonitorRule: row.toolMonitorRule } ;
  return { toolMonitorSubscription: t };
};


