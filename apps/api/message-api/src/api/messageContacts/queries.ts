import { and, eq } from "drizzle-orm";

import type { MessageContactId } from "@soco/message-db/schema/messageContacts";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/message-db/index";
import {
  messageContactIdSchema,
  messageContacts,
} from "@soco/message-db/schema/messageContacts";

export const getMessageContacts = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageContacts)
    .where(eq(messageContacts.userId, session?.user.id!));
  const m = rows;
  return { messageContacts: m };
};

export const getMessageContactById = async (id: MessageContactId) => {
  const { session } = await getUserAuth();
  const { id: messageContactId } = messageContactIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messageContacts)
    .where(
      and(
        eq(messageContacts.id, messageContactId),
        eq(messageContacts.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageContact: m };
};
