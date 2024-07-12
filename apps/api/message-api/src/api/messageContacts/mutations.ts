import { db } from "@soco/message-db/client";
import { and, eq } from "@soco/message-db";
import { 
  type MessageContactId, 
  type NewMessageContactParams,
  type UpdateMessageContactParams, 
  updateMessageContactSchema,
  insertMessageContactSchema, 
  messageContacts,
  messageContactIdSchema 
} from "@soco/message-db/schema/messageContacts";
import { getUserAuth } from "@soco/auth-service";

export const createMessageContact = async (messageContact: NewMessageContactParams) => {
  const { session } = await getUserAuth();
  const newMessageContact = insertMessageContactSchema.parse({ ...messageContact, userId: session?.user.id! });
  try {
    const [m] =  await db.insert(messageContacts).values(newMessageContact).returning();
    return { messageContact: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageContact = async (id: MessageContactId, messageContact: UpdateMessageContactParams) => {
  const { session } = await getUserAuth();
  const { id: messageContactId } = messageContactIdSchema.parse({ id });
  const newMessageContact = updateMessageContactSchema.parse({ ...messageContact, userId: session?.user.id! });
  try {
    const [m] =  await db
     .update(messageContacts)
     .set({...newMessageContact, updatedAt: new Date() })
     .where(and(eq(messageContacts.id, messageContactId!), eq(messageContacts.userId, session?.user.id!)))
     .returning();
    return { messageContact: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageContact = async (id: MessageContactId) => {
  const { session } = await getUserAuth();
  const { id: messageContactId } = messageContactIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageContacts).where(and(eq(messageContacts.id, messageContactId!), eq(messageContacts.userId, session?.user.id!)))
    .returning();
    return { messageContact: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

