import type {
  EventsHandlerId,
  NewEventsHandlerParams,
  UpdateEventsHandlerParams,
} from "@soco/event-db/schema/eventsHandlers";
import { eq } from "@soco/event-db";
import { db } from "@soco/event-db/client";
import {
  eventsHandlerIdSchema,
  eventsHandlers,
  insertEventsHandlerSchema,
  updateEventsHandlerSchema,
} from "@soco/event-db/schema/eventsHandlers";

export const createEventsHandler = async (
  eventsHandler: NewEventsHandlerParams,
) => {
  const newEventsHandler = insertEventsHandlerSchema.parse(eventsHandler);
  try {
    const [e] = await db
      .insert(eventsHandlers)
      .values(newEventsHandler)
      .returning();
    return { eventsHandler: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEventsHandler = async (
  id: EventsHandlerId,
  eventsHandler: UpdateEventsHandlerParams,
) => {
  const { id: eventsHandlerId } = eventsHandlerIdSchema.parse({ id });
  const newEventsHandler = updateEventsHandlerSchema.parse(eventsHandler);
  try {
    const [e] = await db
      .update(eventsHandlers)
      .set(newEventsHandler)
      .where(eq(eventsHandlers.id, eventsHandlerId!))
      .returning();
    return { eventsHandler: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEventsHandler = async (id: EventsHandlerId) => {
  const { id: eventsHandlerId } = eventsHandlerIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(eventsHandlers)
      .where(eq(eventsHandlers.id, eventsHandlerId!))
      .returning();
    return { eventsHandler: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
