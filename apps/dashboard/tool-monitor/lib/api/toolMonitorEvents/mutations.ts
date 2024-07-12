import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ToolMonitorEventId, 
  type NewToolMonitorEventParams,
  type UpdateToolMonitorEventParams, 
  updateToolMonitorEventSchema,
  insertToolMonitorEventSchema, 
  toolMonitorEvents,
  toolMonitorEventIdSchema 
} from "@/lib/db/schema/toolMonitorEvents";

export const createToolMonitorEvent = async (toolMonitorEvent: NewToolMonitorEventParams) => {
  const newToolMonitorEvent = insertToolMonitorEventSchema.parse(toolMonitorEvent);
  try {
    const [t] =  await db.insert(toolMonitorEvents).values(newToolMonitorEvent).returning();
    return { toolMonitorEvent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolMonitorEvent = async (id: ToolMonitorEventId, toolMonitorEvent: UpdateToolMonitorEventParams) => {
  const { id: toolMonitorEventId } = toolMonitorEventIdSchema.parse({ id });
  const newToolMonitorEvent = updateToolMonitorEventSchema.parse(toolMonitorEvent);
  try {
    const [t] =  await db
     .update(toolMonitorEvents)
     .set({...newToolMonitorEvent, updatedAt: new Date() })
     .where(eq(toolMonitorEvents.id, toolMonitorEventId!))
     .returning();
    return { toolMonitorEvent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolMonitorEvent = async (id: ToolMonitorEventId) => {
  const { id: toolMonitorEventId } = toolMonitorEventIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(toolMonitorEvents).where(eq(toolMonitorEvents.id, toolMonitorEventId!))
    .returning();
    return { toolMonitorEvent: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

