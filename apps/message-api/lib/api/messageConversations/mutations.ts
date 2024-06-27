import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  MessageConversationId, 
  NewMessageConversationParams,
  UpdateMessageConversationParams, 
  updateMessageConversationSchema,
  insertMessageConversationSchema, 
  messageConversations,
  messageConversationIdSchema 
} from "@/lib/db/schema/messageConversations";

export const createMessageConversation = async (messageConversation: NewMessageConversationParams) => {
  const newMessageConversation = insertMessageConversationSchema.parse(messageConversation);
  try {
    const [m] =  await db.insert(messageConversations).values(newMessageConversation).returning();
    return { messageConversation: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageConversation = async (id: MessageConversationId, messageConversation: UpdateMessageConversationParams) => {
  const { id: messageConversationId } = messageConversationIdSchema.parse({ id });
  const newMessageConversation = updateMessageConversationSchema.parse(messageConversation);
  try {
    const [m] =  await db
     .update(messageConversations)
     .set({...newMessageConversation, updatedAt: new Date() })
     .where(eq(messageConversations.id, messageConversationId!))
     .returning();
    return { messageConversation: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageConversation = async (id: MessageConversationId) => {
  const { id: messageConversationId } = messageConversationIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageConversations).where(eq(messageConversations.id, messageConversationId!))
    .returning();
    return { messageConversation: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

