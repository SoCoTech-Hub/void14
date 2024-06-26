import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type MessageUsersBlockedId, messageUsersBlockedIdSchema, messageUsersBlockeds } from "@/lib/db/schema/messageUsersBlockeds";

export const getMessageUsersBlockeds = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageUsersBlockeds).where(eq(messageUsersBlockeds.userId, session?.user.id!));
  const m = rows
  return { messageUsersBlockeds: m };
};

export const getMessageUsersBlockedById = async (id: MessageUsersBlockedId) => {
  const { session } = await getUserAuth();
  const { id: messageUsersBlockedId } = messageUsersBlockedIdSchema.parse({ id });
  const [row] = await db.select().from(messageUsersBlockeds).where(and(eq(messageUsersBlockeds.id, messageUsersBlockedId), eq(messageUsersBlockeds.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageUsersBlocked: m };
};


