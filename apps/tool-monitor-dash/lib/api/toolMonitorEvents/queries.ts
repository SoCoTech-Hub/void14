import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type ToolMonitorEventId, toolMonitorEventIdSchema, toolMonitorEvents } from "@/lib/db/schema/toolMonitorEvents";

export const getToolMonitorEvents = async () => {
  const rows = await db.select().from(toolMonitorEvents);
  const t = rows
  return { toolMonitorEvents: t };
};

export const getToolMonitorEventById = async (id: ToolMonitorEventId) => {
  const { id: toolMonitorEventId } = toolMonitorEventIdSchema.parse({ id });
  const [row] = await db.select().from(toolMonitorEvents).where(eq(toolMonitorEvents.id, toolMonitorEventId));
  if (row === undefined) return {};
  const t = row;
  return { toolMonitorEvent: t };
};


