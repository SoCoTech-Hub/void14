import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type ChatMessageId, chatMessageIdSchema, chatMessages } from "@/lib/db/schema/chatMessages";
import { chats } from "@/lib/db/schema/chats";

export const getChatMessages = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ chatMessage: chatMessages, chat: chats }).from(chatMessages).leftJoin(chats, eq(chatMessages.chatId, chats.id)).where(eq(chatMessages.userId, session?.user.id!));
  const c = rows .map((r) => ({ ...r.chatMessage, chat: r.chat})); 
  return { chatMessages: c };
};

export const getChatMessageById = async (id: ChatMessageId) => {
  const { session } = await getUserAuth();
  const { id: chatMessageId } = chatMessageIdSchema.parse({ id });
  const [row] = await db.select({ chatMessage: chatMessages, chat: chats }).from(chatMessages).where(and(eq(chatMessages.id, chatMessageId), eq(chatMessages.userId, session?.user.id!))).leftJoin(chats, eq(chatMessages.chatId, chats.id));
  if (row === undefined) return {};
  const c =  { ...row.chatMessage, chat: row.chat } ;
  return { chatMessage: c };
};


