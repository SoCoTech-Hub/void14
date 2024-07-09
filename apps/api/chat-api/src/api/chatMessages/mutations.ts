import type {
  ChatMessageId,
  NewChatMessageParams,
  UpdateChatMessageParams,
} from "@soco/chat-db/schema/chatMessages";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/chat-db";
import {
  chatMessageIdSchema,
  chatMessages,
  insertChatMessageSchema,
  updateChatMessageSchema,
} from "@soco/chat-db/schema/chatMessages";

export const createChatMessage = async (chatMessage: NewChatMessageParams) => {
  const { session } = await getUserAuth();
  const newChatMessage = insertChatMessageSchema.parse({
    ...chatMessage,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(chatMessages)
      .values(newChatMessage)
      .returning();
    return { chatMessage: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChatMessage = async (
  id: ChatMessageId,
  chatMessage: UpdateChatMessageParams,
) => {
  const { session } = await getUserAuth();
  const { id: chatMessageId } = chatMessageIdSchema.parse({ id });
  const newChatMessage = updateChatMessageSchema.parse({
    ...chatMessage,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(chatMessages)
      .set({ ...newChatMessage, updatedAt: new Date() })
      .where(
        and(
          eq(chatMessages.id, chatMessageId!),
          eq(chatMessages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { chatMessage: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChatMessage = async (id: ChatMessageId) => {
  const { session } = await getUserAuth();
  const { id: chatMessageId } = chatMessageIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(chatMessages)
      .where(
        and(
          eq(chatMessages.id, chatMessageId!),
          eq(chatMessages.userId, session?.user.id!),
        ),
      )
      .returning();
    return { chatMessage: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
