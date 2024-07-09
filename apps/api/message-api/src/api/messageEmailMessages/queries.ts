import { and, eq } from "drizzle-orm";

import type { MessageEmailMessageId } from "@soco/message-db/schema/messageEmailMessages";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/message-db/index";
import {
  messageEmailMessageIdSchema,
  messageEmailMessages,
} from "@soco/message-db/schema/messageEmailMessages";

export const getMessageEmailMessages = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageEmailMessages)
    .where(eq(messageEmailMessages.userId, session?.user.id!));
  const m = rows;
  return { messageEmailMessages: m };
};

export const getMessageEmailMessageById = async (id: MessageEmailMessageId) => {
  const { session } = await getUserAuth();
  const { id: messageEmailMessageId } = messageEmailMessageIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(messageEmailMessages)
    .where(
      and(
        eq(messageEmailMessages.id, messageEmailMessageId),
        eq(messageEmailMessages.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageEmailMessage: m };
};
