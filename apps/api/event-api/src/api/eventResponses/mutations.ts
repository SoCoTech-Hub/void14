import type {
  EventResponseId,
  NewEventResponseParams,
  UpdateEventResponseParams,
} from "@soco/event-db/schema/eventResponses";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/event-db";
import { db } from "@soco/event-db/client";
import {
  eventResponseIdSchema,
  eventResponses,
  insertEventResponseSchema,
  updateEventResponseSchema,
} from "@soco/event-db/schema/eventResponses";

export const createEventResponse = async (
  eventResponse: NewEventResponseParams,
) => {
  const { session } = await getUserAuth();
  const newEventResponse = insertEventResponseSchema.parse({
    ...eventResponse,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(eventResponses)
      .values(newEventResponse)
      .returning();
    return { eventResponse: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEventResponse = async (
  id: EventResponseId,
  eventResponse: UpdateEventResponseParams,
) => {
  const { session } = await getUserAuth();
  const { id: eventResponseId } = eventResponseIdSchema.parse({ id });
  const newEventResponse = updateEventResponseSchema.parse({
    ...eventResponse,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(eventResponses)
      .set({ ...newEventResponse, updatedAt: new Date() })
      .where(
        and(
          eq(eventResponses.id, eventResponseId!),
          eq(eventResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { eventResponse: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEventResponse = async (id: EventResponseId) => {
  const { session } = await getUserAuth();
  const { id: eventResponseId } = eventResponseIdSchema.parse({ id });
  try {
    const [e] = await db
      .delete(eventResponses)
      .where(
        and(
          eq(eventResponses.id, eventResponseId!),
          eq(eventResponses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { eventResponse: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
