import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type MessageProcessorId, 
  type NewMessageProcessorParams,
  type UpdateMessageProcessorParams, 
  updateMessageProcessorSchema,
  insertMessageProcessorSchema, 
  messageProcessors,
  messageProcessorIdSchema 
} from "@/lib/db/schema/messageProcessors";

export const createMessageProcessor = async (messageProcessor: NewMessageProcessorParams) => {
  const newMessageProcessor = insertMessageProcessorSchema.parse(messageProcessor);
  try {
    const [m] =  await db.insert(messageProcessors).values(newMessageProcessor).returning();
    return { messageProcessor: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageProcessor = async (id: MessageProcessorId, messageProcessor: UpdateMessageProcessorParams) => {
  const { id: messageProcessorId } = messageProcessorIdSchema.parse({ id });
  const newMessageProcessor = updateMessageProcessorSchema.parse(messageProcessor);
  try {
    const [m] =  await db
     .update(messageProcessors)
     .set(newMessageProcessor)
     .where(eq(messageProcessors.id, messageProcessorId!))
     .returning();
    return { messageProcessor: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageProcessor = async (id: MessageProcessorId) => {
  const { id: messageProcessorId } = messageProcessorIdSchema.parse({ id });
  try {
    const [m] =  await db.delete(messageProcessors).where(eq(messageProcessors.id, messageProcessorId!))
    .returning();
    return { messageProcessor: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

