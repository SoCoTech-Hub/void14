import { db } from "@soco/tool-monitor-db/client";
import { eq, and } from "@soco/tool-monitor-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolMonitorHistoryId, toolMonitorHistoryIdSchema, toolMonitorHistories } from "@soco/tool-monitor-db/schema/toolMonitorHistories";

export const getToolMonitorHistories = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(toolMonitorHistories).where(eq(toolMonitorHistories.userId, session?.user.id!));
  const t = rows
  return { toolMonitorHistories: t };
};

export const getToolMonitorHistoryById = async (id: ToolMonitorHistoryId) => {
  const { session } = await getUserAuth();
  const { id: toolMonitorHistoryId } = toolMonitorHistoryIdSchema.parse({ id });
  const [row] = await db.select().from(toolMonitorHistories).where(and(eq(toolMonitorHistories.id, toolMonitorHistoryId), eq(toolMonitorHistories.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { toolMonitorHistory: t };
};


