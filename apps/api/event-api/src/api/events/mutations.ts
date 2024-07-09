import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/event-db/index";
import {
  EventId,
  eventIdSchema,
  events,
  insertEventSchema,
  NewEventParams,
  UpdateEventParams,
  updateEventSchema,
} from "@soco/event-db/schema/events";

export const createEvent = async (event: NewEventParams) => {
  const { session } = await getUserAuth();
  const newEvent = insertEventSchema.parse({
    ...event,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db.insert(events).values(newEvent).returning();
    return { event: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEvent = async (id: EventId, event: UpdateEventParams) => {
  const { session } = await getUserAuth();
  const { id: eventId } = eventIdSchema.parse({ id });
  const newEvent = updateEventSchema.parse({
    ...event,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(events)
      .set({ ...newEvent, updatedAt: new Date() })
      .where(and(eq(events.id, eventId!), eq(events.userId, session?.user.id!)))
      .returning();
    return { event: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEvent = async (id: EventId) => {
  const { session } = await getUserAuth();
  const { id: eventId } = eventIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(events)
      .where(and(eq(events.id, eventId!), eq(events.userId, session?.user.id!)))
      .returning();
    return { event: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
