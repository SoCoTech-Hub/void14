import { db } from "@soco/message-db/client";
import { eq } from "@soco/message-db";
import { 
  MessageinboundHandlerId, 
  NewMessageinboundHandlerParams,
  UpdateMessageinboundHandlerParams, 
  updateMessageinboundHandlerSchema,
  insertMessageinboundHandlerSchema, 
  messageinboundHandlers,
  messageinboundHandlerIdSchema 
} from "@soco/message-db/schema/messageinboundHandlers";

export const createMessageinboundHandler = async (messageinboundHandler: NewMessageinboundHandlerParams) => {
  const newMessageinboundHandler = insertMessageinboundHandlerSchema.parse(messageinboundHandler);
  try {
    const [m] =  await db.insert(messageinboundHandlers).values(newMessageinboundHandler).returning();
    return { messageinboundHandler: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageinboundHandler = async (id: MessageinboundHandlerId, messageinboundHandler: UpdateMessageinboundHandlerParams) => {
  const { id: messageinboundHandlerId } = messageinboundHandlerIdSchema.parse({ id });
  const newMessageinboundHandler = updateMessageinboundHandlerSchema.parse(messageinboundHandler);
  try {
    const [m] =  await db
     .update(messageinboundHandlers)
     .set(newMessageinboundHandler)
     .where(eq(messageinboundHandlers.id, messageinboundHandlerId!))
     .returning();
    return { messageinboundHandler: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageinboundHandler = async (id: MessageinboundHandlerId) => {
  const { id: messageinboundHandlerId } = messageinboundHandlerIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageinboundHandlers).where(eq(messageinboundHandlers.id, messageinboundHandlerId!))
    .returning();
    return { messageinboundHandler: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

