import { and, eq } from "drizzle-orm";

import type { ChatUserId } from "@soco/chat-db/schema/chatUsers";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/chat-db/index";
import { chats } from "@soco/chat-db/schema/chats";
import { chatUserIdSchema, chatUsers } from "@soco/chat-db/schema/chatUsers";

export const getChatUsers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ chatUser: chatUsers, chat: chats })
    .from(chatUsers)
    .leftJoin(chats, eq(chatUsers.chatId, chats.id))
    .where(eq(chatUsers.userId, session?.user.id!));
  const c = rows.map((r) => ({ ...r.chatUser, chat: r.chat }));
  return { chatUsers: c };
};

export const getChatUserById = async (id: ChatUserId) => {
  const { session } = await getUserAuth();
  const { id: chatUserId } = chatUserIdSchema.parse({ id });
  const [row] = await db
    .select({ chatUser: chatUsers, chat: chats })
    .from(chatUsers)
    .where(
      and(
        eq(chatUsers.id, chatUserId),
        eq(chatUsers.userId, session?.user.id!),
      ),
    )
    .leftJoin(chats, eq(chatUsers.chatId, chats.id));
  if (row === undefined) return {};
  const c = { ...row.chatUser, chat: row.chat };
  return { chatUser: c };
};
