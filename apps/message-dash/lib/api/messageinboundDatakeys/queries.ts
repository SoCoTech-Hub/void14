import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type MessageinboundDatakeyId, messageinboundDatakeyIdSchema, messageinboundDatakeys } from "@/lib/db/schema/messageinboundDatakeys";

export const getMessageinboundDatakeys = async () => {
  const rows = await db.select().from(messageinboundDatakeys);
  const m = rows
  return { messageinboundDatakeys: m };
};

export const getMessageinboundDatakeyById = async (id: MessageinboundDatakeyId) => {
  const { id: messageinboundDatakeyId } = messageinboundDatakeyIdSchema.parse({ id });
  const [row] = await db.select().from(messageinboundDatakeys).where(eq(messageinboundDatakeys.id, messageinboundDatakeyId));
  if (row === undefined) return {};
  const m = row;
  return { messageinboundDatakey: m };
};


