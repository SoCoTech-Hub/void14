import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type MessageContactId, messageContactIdSchema, messageContacts } from "@/lib/db/schema/messageContacts";

export const getMessageContacts = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageContacts).where(eq(messageContacts.userId, session?.user.id!));
  const m = rows
  return { messageContacts: m };
};

export const getMessageContactById = async (id: MessageContactId) => {
  const { session } = await getUserAuth();
  const { id: messageContactId } = messageContactIdSchema.parse({ id });
  const [row] = await db.select().from(messageContacts).where(and(eq(messageContacts.id, messageContactId), eq(messageContacts.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageContact: m };
};


