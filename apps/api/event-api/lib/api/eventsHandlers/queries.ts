import { eq } from "drizzle-orm";

import type { EventsHandlerId } from "../../db/schema/eventsHandlers";
import { db } from "../../db/index";
import {
  eventsHandlerIdSchema,
  eventsHandlers,
} from "../../db/schema/eventsHandlers";

export const getEventsHandlers = async () => {
  const rows = await db.select().from(eventsHandlers);
  const e = rows;
  return { eventsHandlers: e };
};

export const getEventsHandlerById = async (id: EventsHandlerId) => {
  const { id: eventsHandlerId } = eventsHandlerIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(eventsHandlers)
    .where(eq(eventsHandlers.id, eventsHandlerId));
  if (row === undefined) return {};
  const e = row;
  return { eventsHandler: e };
};
