import { db } from "@soco/message-db/client";
import { eq, and } from "@soco/message-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type MessageId, messageIdSchema, messages } from "@soco/message-db/schema/messages";

export const getMessages = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messages).where(eq(messages.userId, session?.user.id!));
  const m = rows
  return { messages: m };
};

export const getMessageById = async (id: MessageId) => {
  const { session } = await getUserAuth();
  const { id: messageId } = messageIdSchema.parse({ id });
  const [row] = await db.select().from(messages).where(and(eq(messages.id, messageId), eq(messages.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { message: m };
};


