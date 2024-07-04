import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type MessageReadId, messageReadIdSchema, messageReads } from "@/lib/db/schema/messageReads";

export const getMessageReads = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageReads).where(eq(messageReads.userId, session?.user.id!));
  const m = rows
  return { messageReads: m };
};

export const getMessageReadById = async (id: MessageReadId) => {
  const { session } = await getUserAuth();
  const { id: messageReadId } = messageReadIdSchema.parse({ id });
  const [row] = await db.select().from(messageReads).where(and(eq(messageReads.id, messageReadId), eq(messageReads.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageRead: m };
};


