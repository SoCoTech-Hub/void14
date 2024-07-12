import type { ToolMonitorEventId } from "@soco/tool-monitor-db/schema/toolMonitorEvents";
import { eq } from "@soco/tool-monitor-db";
import { db } from "@soco/tool-monitor-db/client";
import {
  toolMonitorEventIdSchema,
  toolMonitorEvents,
} from "@soco/tool-monitor-db/schema/toolMonitorEvents";

export const getToolMonitorEvents = async () => {
  const rows = await db.select().from(toolMonitorEvents);
  const t = rows;
  return { toolMonitorEvents: t };
};

export const getToolMonitorEventById = async (id: ToolMonitorEventId) => {
  const { id: toolMonitorEventId } = toolMonitorEventIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolMonitorEvents)
    .where(eq(toolMonitorEvents.id, toolMonitorEventId));
  if (row === undefined) return {};
  const t = row;
  return { toolMonitorEvent: t };
};
