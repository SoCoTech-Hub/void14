import { db } from "@soco/event-db/client";
import { eq } from "@soco/event-db";
import { type EventsQueueHandlerId, eventsQueueHandlerIdSchema, eventsQueueHandlers } from "@soco/event-db/schema/eventsQueueHandlers";

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


