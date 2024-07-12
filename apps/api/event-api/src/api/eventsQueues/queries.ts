import type { EventsQueueId } from "@soco/event-db/schema/eventsQueues";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/event-db";
import { db } from "@soco/event-db/client";
import {
  eventsQueueIdSchema,
  eventsQueues,
} from "@soco/event-db/schema/eventsQueues";

export const getEventsQueues = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(eventsQueues)
    .where(eq(eventsQueues.userId, session?.user.id!));
  const e = rows;
  return { eventsQueues: e };
};

export const getEventsQueueById = async (id: EventsQueueId) => {
  const { session } = await getUserAuth();
  const { id: eventsQueueId } = eventsQueueIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(eventsQueues)
    .where(
      and(
        eq(eventsQueues.id, eventsQueueId),
        eq(eventsQueues.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const e = row;
  return { eventsQueue: e };
};
