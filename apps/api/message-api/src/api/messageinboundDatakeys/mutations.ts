import { db } from "@soco/message-db/client";
import { eq } from "@soco/message-db";
import { 
  type MessageinboundDatakeyId, 
  type NewMessageinboundDatakeyParams,
  type UpdateMessageinboundDatakeyParams, 
  updateMessageinboundDatakeySchema,
  insertMessageinboundDatakeySchema, 
  messageinboundDatakeys,
  messageinboundDatakeyIdSchema 
} from "@soco/message-db/schema/messageinboundDatakeys";

export const createMessageinboundDatakey = async (messageinboundDatakey: NewMessageinboundDatakeyParams) => {
  const newMessageinboundDatakey = insertMessageinboundDatakeySchema.parse(messageinboundDatakey);
  try {
    const [m] =  await db.insert(messageinboundDatakeys).values(newMessageinboundDatakey).returning();
    return { messageinboundDatakey: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageinboundDatakey = async (id: MessageinboundDatakeyId, messageinboundDatakey: UpdateMessageinboundDatakeyParams) => {
  const { id: messageinboundDatakeyId } = messageinboundDatakeyIdSchema.parse({ id });
  const newMessageinboundDatakey = updateMessageinboundDatakeySchema.parse(messageinboundDatakey);
  try {
    const [m] =  await db
     .update(messageinboundDatakeys)
     .set({...newMessageinboundDatakey, updatedAt: new Date() })
     .where(eq(messageinboundDatakeys.id, messageinboundDatakeyId!))
     .returning();
    return { messageinboundDatakey: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageinboundDatakey = async (id: MessageinboundDatakeyId) => {
  const { id: messageinboundDatakeyId } = messageinboundDatakeyIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageinboundDatakeys).where(eq(messageinboundDatakeys.id, messageinboundDatakeyId!))
    .returning();
    return { messageinboundDatakey: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

