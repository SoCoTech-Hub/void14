import { and, eq } from "drizzle-orm";

import type { ChatMessageId } from "@soco/chat-db/schema/chatMessages";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/chat-db/index";
import {
  chatMessageIdSchema,
  chatMessages,
} from "@soco/chat-db/schema/chatMessages";
import { chats } from "@soco/chat-db/schema/chats";

export const getChatMessages = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ chatMessage: chatMessages, chat: chats })
    .from(chatMessages)
    .leftJoin(chats, eq(chatMessages.chatId, chats.id))
    .where(eq(chatMessages.userId, session?.user.id!));
  const c = rows.map((r) => ({ ...r.chatMessage, chat: r.chat }));
  return { chatMessages: c };
};

export const getChatMessageById = async (id: ChatMessageId) => {
  const { session } = await getUserAuth();
  const { id: chatMessageId } = chatMessageIdSchema.parse({ id });
  const [row] = await db
    .select({ chatMessage: chatMessages, chat: chats })
    .from(chatMessages)
    .where(
      and(
        eq(chatMessages.id, chatMessageId),
        eq(chatMessages.userId, session?.user.id!),
      ),
    )
    .leftJoin(chats, eq(chatMessages.chatId, chats.id));
  if (row === undefined) return {};
  const c = { ...row.chatMessage, chat: row.chat };
  return { chatMessage: c };
};
