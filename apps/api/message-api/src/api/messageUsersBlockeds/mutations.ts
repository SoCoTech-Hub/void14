import type {
  MessageUsersBlockedId,
  NewMessageUsersBlockedParams,
  UpdateMessageUsersBlockedParams,
} from "@soco/message-db/schema/messageUsersBlockeds";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  insertMessageUsersBlockedSchema,
  messageUsersBlockedIdSchema,
  messageUsersBlockeds,
  updateMessageUsersBlockedSchema,
} from "@soco/message-db/schema/messageUsersBlockeds";

export const createMessageUsersBlocked = async (
  messageUsersBlocked: NewMessageUsersBlockedParams,
) => {
  const { session } = await getUserAuth();
  const newMessageUsersBlocked = insertMessageUsersBlockedSchema.parse({
    ...messageUsersBlocked,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .insert(messageUsersBlockeds)
      .values(newMessageUsersBlocked)
      .returning();
    return { messageUsersBlocked: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageUsersBlocked = async (
  id: MessageUsersBlockedId,
  messageUsersBlocked: UpdateMessageUsersBlockedParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageUsersBlockedId } = messageUsersBlockedIdSchema.parse({
    id,
  });
  const newMessageUsersBlocked = updateMessageUsersBlockedSchema.parse({
    ...messageUsersBlocked,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .update(messageUsersBlockeds)
      .set({ ...newMessageUsersBlocked, updatedAt: new Date() })
      .where(
        and(
          eq(messageUsersBlockeds.id, messageUsersBlockedId!),
          eq(messageUsersBlockeds.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageUsersBlocked: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageUsersBlocked = async (id: MessageUsersBlockedId) => {
  const { session } = await getUserAuth();
  const { id: messageUsersBlockedId } = messageUsersBlockedIdSchema.parse({
    id,
  });
  try {
    const [m] = await db
      .delete(messageUsersBlockeds)
      .where(
        and(
          eq(messageUsersBlockeds.id, messageUsersBlockedId!),
          eq(messageUsersBlockeds.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageUsersBlocked: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
