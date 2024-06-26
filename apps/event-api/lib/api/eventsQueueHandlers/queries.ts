import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type EventsQueueHandlerId, eventsQueueHandlerIdSchema, eventsQueueHandlers } from "@/lib/db/schema/eventsQueueHandlers";

export const getEventsQueueHandlers = async () => {
  const rows = await db.select().from(eventsQueueHandlers);
  const e = rows
  return { eventsQueueHandlers: e };
};

export const getEventsQueueHandlerById = async (id: EventsQueueHandlerId) => {
  const { id: eventsQueueHandlerId } = eventsQueueHandlerIdSchema.parse({ id });
  const [row] = await db.select().from(eventsQueueHandlers).where(eq(eventsQueueHandlers.id, eventsQueueHandlerId));
  if (row === undefined) return {};
  const e = row;
  return { eventsQueueHandler: e };
};


