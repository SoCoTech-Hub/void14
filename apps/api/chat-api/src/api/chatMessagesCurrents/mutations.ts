import type {
  ChatMessagesCurrentId,
  NewChatMessagesCurrentParams,
  UpdateChatMessagesCurrentParams,
} from "@soco/chat-db/schema/chatMessagesCurrents";
import { getUserAuth } from "@soco/auth-services";
import { and, db, eq } from "@soco/chat-db";
import {
  chatMessagesCurrentIdSchema,
  chatMessagesCurrents,
  insertChatMessagesCurrentSchema,
  updateChatMessagesCurrentSchema,
} from "@soco/chat-db/schema/chatMessagesCurrents";

export const createChatMessagesCurrent = async (
  chatMessagesCurrent: NewChatMessagesCurrentParams,
) => {
  const { session } = await getUserAuth();
  const newChatMessagesCurrent = insertChatMessagesCurrentSchema.parse({
    ...chatMessagesCurrent,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .insert(chatMessagesCurrents)
      .values(newChatMessagesCurrent)
      .returning();
    return { chatMessagesCurrent: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChatMessagesCurrent = async (
  id: ChatMessagesCurrentId,
  chatMessagesCurrent: UpdateChatMessagesCurrentParams,
) => {
  const { session } = await getUserAuth();
  const { id: chatMessagesCurrentId } = chatMessagesCurrentIdSchema.parse({
    id,
  });
  const newChatMessagesCurrent = updateChatMessagesCurrentSchema.parse({
    ...chatMessagesCurrent,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(chatMessagesCurrents)
      .set({ ...newChatMessagesCurrent, updatedAt: new Date() })
      .where(
        and(
          eq(chatMessagesCurrents.id, chatMessagesCurrentId!),
          eq(chatMessagesCurrents.userId, session?.user.id!),
        ),
      )
      .returning();
    return { chatMessagesCurrent: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChatMessagesCurrent = async (id: ChatMessagesCurrentId) => {
  const { session } = await getUserAuth();
  const { id: chatMessagesCurrentId } = chatMessagesCurrentIdSchema.parse({
    id,
  });
  try {
    const [c] = await db
      .delete(chatMessagesCurrents)
      .where(
        and(
          eq(chatMessagesCurrents.id, chatMessagesCurrentId!),
          eq(chatMessagesCurrents.userId, session?.user.id!),
        ),
      )
      .returning();
    return { chatMessagesCurrent: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
