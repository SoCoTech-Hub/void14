import { db } from "@soco/event-db/client";
import { eq } from "@soco/event-db";
import { type EventsHandlerId, eventsHandlerIdSchema, eventsHandlers } from "@soco/event-db/schema/eventsHandlers";

export const getEventsHandlers = async () => {
  const rows = await db.select().from(eventsHandlers);
  const e = rows
  return { eventsHandlers: e };
};

export const getEventsHandlerById = async (id: EventsHandlerId) => {
  const { id: eventsHandlerId } = eventsHandlerIdSchema.parse({ id });
  const [row] = await db.select().from(eventsHandlers).where(eq(eventsHandlers.id, eventsHandlerId));
  if (row === undefined) return {};
  const e = row;
  return { eventsHandler: e };
};


