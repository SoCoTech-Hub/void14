import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  insertMessageSchema,
  MessageId,
  messageIdSchema,
  messages,
  NewMessageParams,
  UpdateMessageParams,
  updateMessageSchema,
} from "@soco/message-db/schema/messages";

export const createMessage = async (message: NewMessageParams) => {
  const { session } = await getUserAuth();
  const newMessage = insertMessageSchema.parse({
    ...message,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db.insert(messages).values(newMessage).returning();
    return { message: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessage = async (
  id: MessageId,
  message: UpdateMessageParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageId } = messageIdSchema.parse({ id });
  const newMessage = updateMessageSchema.parse({
    ...message,
    userId: session?.user.id!,
  });
  try {
    const [m] = await db
      .update(messages)
      .set({ ...newMessage, updatedAt: new Date() })
      .where(
        and(
          eq(messages.id, messageId!),
          eq(messages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { message: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessage = async (id: MessageId) => {
  const { session } = await getUserAuth();
  const { id: messageId } = messageIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messages)
      .where(
        and(
          eq(messages.id, messageId!),
          eq(messages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { message: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
