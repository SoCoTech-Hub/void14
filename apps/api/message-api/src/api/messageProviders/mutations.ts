import type {
  MessageProviderId,
  NewMessageProviderParams,
  UpdateMessageProviderParams,
} from "@soco/message-db/schema/messageProviders";
import { eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  insertMessageProviderSchema,
  messageProviderIdSchema,
  messageProviders,
  updateMessageProviderSchema,
} from "@soco/message-db/schema/messageProviders";

export const createMessageProvider = async (
  messageProvider: NewMessageProviderParams,
) => {
  const newMessageProvider = insertMessageProviderSchema.parse(messageProvider);
  try {
    const [m] = await db
      .insert(messageProviders)
      .values(newMessageProvider)
      .returning();
    return { messageProvider: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageProvider = async (
  id: MessageProviderId,
  messageProvider: UpdateMessageProviderParams,
) => {
  const { id: messageProviderId } = messageProviderIdSchema.parse({ id });
  const newMessageProvider = updateMessageProviderSchema.parse(messageProvider);
  try {
    const [m] = await db
      .update(messageProviders)
      .set(newMessageProvider)
      .where(eq(messageProviders.id, messageProviderId!))
      .returning();
    return { messageProvider: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageProvider = async (id: MessageProviderId) => {
  const { id: messageProviderId } = messageProviderIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messageProviders)
      .where(eq(messageProviders.id, messageProviderId!))
      .returning();
    return { messageProvider: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
