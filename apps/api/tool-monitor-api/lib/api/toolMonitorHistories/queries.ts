import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ToolMonitorHistoryId, toolMonitorHistoryIdSchema, toolMonitorHistories } from "@/lib/db/schema/toolMonitorHistories";

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


