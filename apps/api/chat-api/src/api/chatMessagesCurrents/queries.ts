import { and, eq } from "drizzle-orm";

import type { ChatMessagesCurrentId } from "@soco/chat-db/schema/chatMessagesCurrents";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/chat-db/index";
import {
  chatMessagesCurrentIdSchema,
  chatMessagesCurrents,
} from "@soco/chat-db/schema/chatMessagesCurrents";
import { chats } from "@soco/chat-db/schema/chats";

export const getChatMessagesCurrents = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ chatMessagesCurrent: chatMessagesCurrents, chat: chats })
    .from(chatMessagesCurrents)
    .leftJoin(chats, eq(chatMessagesCurrents.chatId, chats.id))
    .where(eq(chatMessagesCurrents.userId, session?.user.id!));
  const c = rows.map((r) => ({ ...r.chatMessagesCurrent, chat: r.chat }));
  return { chatMessagesCurrents: c };
};

export const getChatMessagesCurrentById = async (id: ChatMessagesCurrentId) => {
  const { session } = await getUserAuth();
  const { id: chatMessagesCurrentId } = chatMessagesCurrentIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({ chatMessagesCurrent: chatMessagesCurrents, chat: chats })
    .from(chatMessagesCurrents)
    .where(
      and(
        eq(chatMessagesCurrents.id, chatMessagesCurrentId),
        eq(chatMessagesCurrents.userId, session?.user.id!),
      ),
    )
    .leftJoin(chats, eq(chatMessagesCurrents.chatId, chats.id));
  if (row === undefined) return {};
  const c = { ...row.chatMessagesCurrent, chat: row.chat };
  return { chatMessagesCurrent: c };
};
