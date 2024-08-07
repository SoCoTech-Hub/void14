import type {
  MessageReadId,
  NewMessageReadParams,
  UpdateMessageReadParams,
} from "@soco/message-db/schema/messageReads";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  insertMessageReadSchema,
  messageReadIdSchema,
  messageReads,
  updateMessageReadSchema,
} from "@soco/message-db/schema/messageReads";

export const createMessageRead = async (messageRead: NewMessageReadParams) => {
  const { session } = await getUserAuth();
  const newMessageRead = insertMessageReadSchema.parse({
    ...messageRead,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .insert(messageReads)
      .values(newMessageRead)
      .returning();
    return { messageRead: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageRead = async (
  id: MessageReadId,
  messageRead: UpdateMessageReadParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageReadId } = messageReadIdSchema.parse({ id });
  const newMessageRead = updateMessageReadSchema.parse({
    ...messageRead,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .update(messageReads)
      .set({ ...newMessageRead, updatedAt: new Date() })
      .where(
        and(
          eq(messageReads.id, messageReadId!),
          eq(messageReads.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageRead: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageRead = async (id: MessageReadId) => {
  const { session } = await getUserAuth();
  const { id: messageReadId } = messageReadIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messageReads)
      .where(
        and(
          eq(messageReads.id, messageReadId!),
          eq(messageReads.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageRead: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
