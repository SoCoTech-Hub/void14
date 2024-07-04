import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { EventResponseId } from "../db/schema/eventResponses";
import { db } from "../db/index";
import {
  eventResponseIdSchema,
  eventResponses,
} from "../db/schema/eventResponses";
import { events } from "../db/schema/events";

export const getEventResponses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ eventResponse: eventResponses, event: events })
    .from(eventResponses)
    .leftJoin(events, eq(eventResponses.eventId, events.id))
    .where(eq(eventResponses.userId, session?.user.id!));
  const e = rows.map((r) => ({ ...r.eventResponse, event: r.event }));
  return { eventResponses: e };
};

export const getEventResponseById = async (id: EventResponseId) => {
  const { session } = await getUserAuth();
  const { id: eventResponseId } = eventResponseIdSchema.parse({ id });
  const [row] = await db
    .select({ eventResponse: eventResponses, event: events })
    .from(eventResponses)
    .where(
      and(
        eq(eventResponses.id, eventResponseId),
        eq(eventResponses.userId, session?.user.id!),
      ),
    )
    .leftJoin(events, eq(eventResponses.eventId, events.id));
  if (row === undefined) return {};
  const e = { ...row.eventResponse, event: row.event };
  return { eventResponse: e };
};
