import type { MessageProviderId } from "@soco/message-db/schema/messageProviders";
import { eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messageProviderIdSchema,
  messageProviders,
} from "@soco/message-db/schema/messageProviders";

export const getMessageProviders = async () => {
  const rows = await db.select().from(messageProviders);
  const m = rows;
  return { messageProviders: m };
};

export const getMessageProviderById = async (id: MessageProviderId) => {
  const { id: messageProviderId } = messageProviderIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messageProviders)
    .where(eq(messageProviders.id, messageProviderId));
  if (row === undefined) return {};
  const m = row;
  return { messageProvider: m };
};
