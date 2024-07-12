import type {
  ChatUserId,
  NewChatUserParams,
  UpdateChatUserParams,
} from "@soco/chat-db/schema/chatUsers";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/chat-db";
import { db } from "@soco/chat-db/client";
import {
  chatUserIdSchema,
  chatUsers,
  insertChatUserSchema,
  updateChatUserSchema,
} from "@soco/chat-db/schema/chatUsers";

export const createChatUser = async (chatUser: NewChatUserParams) => {
  const { session } = await getUserAuth();
  const newChatUser = insertChatUserSchema.parse({
    ...chatUser,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db.insert(chatUsers).values(newChatUser).returning();
    return { chatUser: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateChatUser = async (
  id: ChatUserId,
  chatUser: UpdateChatUserParams,
) => {
  const { session } = await getUserAuth();
  const { id: chatUserId } = chatUserIdSchema.parse({ id });
  const newChatUser = updateChatUserSchema.parse({
    ...chatUser,
    userId: session?.user.id!,
  });
  try {
    const [c] = await db
      .update(chatUsers)
      .set({ ...newChatUser, updatedAt: new Date() })
      .where(
        and(
          eq(chatUsers.id, chatUserId!),
          eq(chatUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { chatUser: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteChatUser = async (id: ChatUserId) => {
  const { session } = await getUserAuth();
  const { id: chatUserId } = chatUserIdSchema.parse({ id });
  try {
    const [c] = await db
      .delete(chatUsers)
      .where(
        and(
          eq(chatUsers.id, chatUserId!),
          eq(chatUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { chatUser: c };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
