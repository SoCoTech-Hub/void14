import type {
  EventsQueueHandlerId,
  NewEventsQueueHandlerParams,
  UpdateEventsQueueHandlerParams,
} from "@soco/event-db/schema/eventsQueueHandlers";
import { eq } from "@soco/event-db";
import { db } from "@soco/event-db/client";
import {
  eventsQueueHandlerIdSchema,
  eventsQueueHandlers,
  insertEventsQueueHandlerSchema,
  updateEventsQueueHandlerSchema,
} from "@soco/event-db/schema/eventsQueueHandlers";

export const createEventsQueueHandler = async (
  eventsQueueHandler: NewEventsQueueHandlerParams,
) => {
  const newEventsQueueHandler =
    insertEventsQueueHandlerSchema.parse(eventsQueueHandler);
  try {
    const [e] = await db
      .insert(eventsQueueHandlers)
      .values(newEventsQueueHandler)
      .returning();
    return { eventsQueueHandler: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEventsQueueHandler = async (
  id: EventsQueueHandlerId,
  eventsQueueHandler: UpdateEventsQueueHandlerParams,
) => {
  const { id: eventsQueueHandlerId } = eventsQueueHandlerIdSchema.parse({ id });
  const newEventsQueueHandler =
    updateEventsQueueHandlerSchema.parse(eventsQueueHandler);
  try {
    const [e] = await db
      .update(eventsQueueHandlers)
      .set({ ...newEventsQueueHandler, updatedAt: new Date() })
      .where(eq(eventsQueueHandlers.id, eventsQueueHandlerId!))
      .returning();
    return { eventsQueueHandler: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEventsQueueHandler = async (id: EventsQueueHandlerId) => {
  const { id: eventsQueueHandlerId } = eventsQueueHandlerIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(eventsQueueHandlers)
      .where(eq(eventsQueueHandlers.id, eventsQueueHandlerId!))
      .returning();
    return { eventsQueueHandler: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
