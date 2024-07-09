import { and, eq } from "drizzle-orm";

import type { MessageId } from "@soco/message-db/schema/messages";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/message-db/index";
import { messageIdSchema, messages } from "@soco/message-db/schema/messages";

export const getMessages = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messages)
    .where(eq(messages.userId, session?.user.id!));
  const m = rows;
  return { messages: m };
};

export const getMessageById = async (id: MessageId) => {
  const { session } = await getUserAuth();
  const { id: messageId } = messageIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messages)
    .where(
      and(eq(messages.id, messageId), eq(messages.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const m = row;
  return { message: m };
};
