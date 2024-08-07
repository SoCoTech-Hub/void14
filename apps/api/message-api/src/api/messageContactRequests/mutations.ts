import type {
  MessageContactRequestId,
  NewMessageContactRequestParams,
  UpdateMessageContactRequestParams,
} from "@soco/message-db/schema/messageContactRequests";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  insertMessageContactRequestSchema,
  messageContactRequestIdSchema,
  messageContactRequests,
  updateMessageContactRequestSchema,
} from "@soco/message-db/schema/messageContactRequests";

export const createMessageContactRequest = async (
  messageContactRequest: NewMessageContactRequestParams,
) => {
  const { session } = await getUserAuth();
  const newMessageContactRequest = insertMessageContactRequestSchema.parse({
    ...messageContactRequest,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .insert(messageContactRequests)
      .values(newMessageContactRequest)
      .returning();
    return { messageContactRequest: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageContactRequest = async (
  id: MessageContactRequestId,
  messageContactRequest: UpdateMessageContactRequestParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageContactRequestId } = messageContactRequestIdSchema.parse({
    id,
  });
  const newMessageContactRequest = updateMessageContactRequestSchema.parse({
    ...messageContactRequest,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .update(messageContactRequests)
      .set({ ...newMessageContactRequest, updatedAt: new Date() })
      .where(
        and(
          eq(messageContactRequests.id, messageContactRequestId!),
          eq(messageContactRequests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageContactRequest: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageContactRequest = async (
  id: MessageContactRequestId,
) => {
  const { session } = await getUserAuth();
  const { id: messageContactRequestId } = messageContactRequestIdSchema.parse({
    id,
  });
  try {
    const [m] = await db
      .delete(messageContactRequests)
      .where(
        and(
          eq(messageContactRequests.id, messageContactRequestId!),
          eq(messageContactRequests.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageContactRequest: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
