import { and, eq } from "drizzle-orm";

import type { EventSubscriptionId } from "@soco/event-db/schema/eventSubscriptions";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/event-db/index";
import {
  eventSubscriptionIdSchema,
  eventSubscriptions,
} from "@soco/event-db/schema/eventSubscriptions";

export const getEventSubscriptions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(eventSubscriptions)
    .where(eq(eventSubscriptions.userId, session?.user.id!));
  const e = rows;
  return { eventSubscriptions: e };
};

export const getEventSubscriptionById = async (id: EventSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: eventSubscriptionId } = eventSubscriptionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(eventSubscriptions)
    .where(
      and(
        eq(eventSubscriptions.id, eventSubscriptionId),
        eq(eventSubscriptions.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const e = row;
  return { eventSubscription: e };
};
