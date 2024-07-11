import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/event-db";
import { db } from "@soco/event-db/client";
import {
  EventsQueueId,
  eventsQueueIdSchema,
  eventsQueues,
  insertEventsQueueSchema,
  NewEventsQueueParams,
  UpdateEventsQueueParams,
  updateEventsQueueSchema,
} from "@soco/event-db/schema/eventsQueues";

export const createEventsQueue = async (eventsQueue: NewEventsQueueParams) => {
  const { session } = await getUserAuth();
  const newEventsQueue = insertEventsQueueSchema.parse({
    ...eventsQueue,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(eventsQueues)
      .values(newEventsQueue)
      .returning();
    return { eventsQueue: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEventsQueue = async (
  id: EventsQueueId,
  eventsQueue: UpdateEventsQueueParams,
) => {
  const { session } = await getUserAuth();
  const { id: eventsQueueId } = eventsQueueIdSchema.parse({ id });
  const newEventsQueue = updateEventsQueueSchema.parse({
    ...eventsQueue,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(eventsQueues)
      .set({ ...newEventsQueue, updatedAt: new Date() })
      .where(
        and(
          eq(eventsQueues.id, eventsQueueId!),
          eq(eventsQueues.userId, session?.user.id!),
        ),
      )
      .returning();
    return { eventsQueue: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEventsQueue = async (id: EventsQueueId) => {
  const { session } = await getUserAuth();
  const { id: eventsQueueId } = eventsQueueIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(eventsQueues)
      .where(
        and(
          eq(eventsQueues.id, eventsQueueId!),
          eq(eventsQueues.userId, session?.user.id!),
        ),
      )
      .returning();
    return { eventsQueue: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
