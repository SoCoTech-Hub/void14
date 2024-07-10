import { db } from "@soco/message-db/client";
import { eq } from "@soco/message-db";
import { type MessageProcessorId, messageProcessorIdSchema, messageProcessors } from "@soco/message-db/schema/messageProcessors";

export const getMessageProcessors = async () => {
  const rows = await db.select().from(messageProcessors);
  const m = rows
  return { messageProcessors: m };
};

export const getMessageProcessorById = async (id: MessageProcessorId) => {
  const { id: messageProcessorId } = messageProcessorIdSchema.parse({ id });
  const [row] = await db.select().from(messageProcessors).where(eq(messageProcessors.id, messageProcessorId));
  if (row === undefined) return {};
  const m = row;
  return { messageProcessor: m };
};


