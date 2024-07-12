import type { MessageConversationId } from "@soco/message-db/schema/messageConversations";
import { eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messageConversationIdSchema,
  messageConversations,
} from "@soco/message-db/schema/messageConversations";

export const getMessageConversations = async () => {
  const rows = await db.select().from(messageConversations);
  const m = rows;
  return { messageConversations: m };
};

export const getMessageConversationById = async (id: MessageConversationId) => {
  const { id: messageConversationId } = messageConversationIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(messageConversations)
    .where(eq(messageConversations.id, messageConversationId));
  if (row === undefined) return {};
  const m = row;
  return { messageConversation: m };
};
