import type { ChatId } from "@soco/chat-db/schema/chats";
import { db, eq } from "@soco/chat-db";
import { chatIdSchema, chats } from "@soco/chat-db/schema/chats";

export const getChats = async () => {
  const rows = await db.select().from(chats);
  const c = rows;
  return { chats: c };
};

export const getChatById = async (id: ChatId) => {
  const { id: chatId } = chatIdSchema.parse({ id });
  const [row] = await db.select().from(chats).where(eq(chats.id, chatId));
  if (row === undefined) return {};
  const c = row;
  return { chat: c };
};
