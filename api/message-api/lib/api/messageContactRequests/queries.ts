import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type MessageContactRequestId, messageContactRequestIdSchema, messageContactRequests } from "@/lib/db/schema/messageContactRequests";

export const getMessageContactRequests = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageContactRequests).where(eq(messageContactRequests.userId, session?.user.id!));
  const m = rows
  return { messageContactRequests: m };
};

export const getMessageContactRequestById = async (id: MessageContactRequestId) => {
  const { session } = await getUserAuth();
  const { id: messageContactRequestId } = messageContactRequestIdSchema.parse({ id });
  const [row] = await db.select().from(messageContactRequests).where(and(eq(messageContactRequests.id, messageContactRequestId), eq(messageContactRequests.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageContactRequest: m };
};


