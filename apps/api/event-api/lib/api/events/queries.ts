import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { EventId } from "../../db/schema/events";
import { db } from "../../db/index";
import { eventIdSchema, events } from "../../db/schema/events";

export const getEvents = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(events)
    .where(eq(events.userId, session?.user.id!));
  const e = rows;
  return { events: e };
};

export const getEventById = async (id: EventId) => {
  const { session } = await getUserAuth();
  const { id: eventId } = eventIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(events)
    .where(and(eq(events.id, eventId), eq(events.userId, session?.user.id!)));
  if (row === undefined) return {};
  const e = row;
  return { event: e };
};
