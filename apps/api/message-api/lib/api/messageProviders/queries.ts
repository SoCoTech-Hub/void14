import { eq } from "drizzle-orm";

import type { MessageProviderId } from "../../db/schema/messageProviders";
import { db } from "../../db/index";
import {
  messageProviderIdSchema,
  messageProviders,
} from "../../db/schema/messageProviders";

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
