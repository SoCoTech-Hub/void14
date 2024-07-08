import { db } from "@soco/message-db/index";
import { eq } from "drizzle-orm";
import { type MessageConversationId, messageConversationIdSchema, messageConversations } from "@soco/message-db/schema/messageConversations";

export const getMessageConversations = async () => {
  const rows = await db.select().from(messageConversations);
  const m = rows
  return { messageConversations: m };
};

export const getMessageConversationById = async (id: MessageConversationId) => {
  const { id: messageConversationId } = messageConversationIdSchema.parse({ id });
  const [row] = await db.select().from(messageConversations).where(eq(messageConversations.id, messageConversationId));
  if (row === undefined) return {};
  const m = row;
  return { messageConversation: m };
};


