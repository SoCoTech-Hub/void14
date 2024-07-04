import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertMessageEmailMessageSchema,
  MessageEmailMessageId,
  messageEmailMessageIdSchema,
  messageEmailMessages,
  NewMessageEmailMessageParams,
  UpdateMessageEmailMessageParams,
  updateMessageEmailMessageSchema,
} from "../db/schema/messageEmailMessages";

export const createMessageEmailMessage = async (
  messageEmailMessage: NewMessageEmailMessageParams,
) => {
  const { session } = await getUserAuth();
  const newMessageEmailMessage = insertMessageEmailMessageSchema.parse({
    ...messageEmailMessage,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .insert(messageEmailMessages)
      .values(newMessageEmailMessage)
      .returning();
    return { messageEmailMessage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageEmailMessage = async (
  id: MessageEmailMessageId,
  messageEmailMessage: UpdateMessageEmailMessageParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageEmailMessageId } = messageEmailMessageIdSchema.parse({
    id,
  });
  const newMessageEmailMessage = updateMessageEmailMessageSchema.parse({
    ...messageEmailMessage,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .update(messageEmailMessages)
      .set(newMessageEmailMessage)
      .where(
        and(
          eq(messageEmailMessages.id, messageEmailMessageId!),
          eq(messageEmailMessages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageEmailMessage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageEmailMessage = async (id: MessageEmailMessageId) => {
  const { session } = await getUserAuth();
  const { id: messageEmailMessageId } = messageEmailMessageIdSchema.parse({
    id,
  });
  try {
    const [m] = await db
      .delete(messageEmailMessages)
      .where(
        and(
          eq(messageEmailMessages.id, messageEmailMessageId!),
          eq(messageEmailMessages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageEmailMessage: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
