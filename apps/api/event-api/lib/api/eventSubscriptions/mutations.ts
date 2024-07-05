import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  EventSubscriptionId,
  eventSubscriptionIdSchema,
  eventSubscriptions,
  insertEventSubscriptionSchema,
  NewEventSubscriptionParams,
  UpdateEventSubscriptionParams,
  updateEventSubscriptionSchema,
} from "../../db/schema/eventSubscriptions";

export const createEventSubscription = async (
  eventSubscription: NewEventSubscriptionParams,
) => {
  const { session } = await getUserAuth();
  const newEventSubscription = insertEventSubscriptionSchema.parse({
    ...eventSubscription,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(eventSubscriptions)
      .values(newEventSubscription)
      .returning();
    return { eventSubscription: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEventSubscription = async (
  id: EventSubscriptionId,
  eventSubscription: UpdateEventSubscriptionParams,
) => {
  const { session } = await getUserAuth();
  const { id: eventSubscriptionId } = eventSubscriptionIdSchema.parse({ id });
  const newEventSubscription = updateEventSubscriptionSchema.parse({
    ...eventSubscription,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(eventSubscriptions)
      .set({ ...newEventSubscription, updatedAt: new Date() })
      .where(
        and(
          eq(eventSubscriptions.id, eventSubscriptionId!),
          eq(eventSubscriptions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { eventSubscription: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEventSubscription = async (id: EventSubscriptionId) => {
  const { session } = await getUserAuth();
  const { id: eventSubscriptionId } = eventSubscriptionIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(eventSubscriptions)
      .where(
        and(
          eq(eventSubscriptions.id, eventSubscriptionId!),
          eq(eventSubscriptions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { eventSubscription: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
