import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type MessageinboundMessagelistId, messageinboundMessagelistIdSchema, messageinboundMessagelists } from "@/lib/db/schema/messageinboundMessagelists";

export const getMessageinboundMessagelists = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageinboundMessagelists).where(eq(messageinboundMessagelists.userId, session?.user.id!));
  const m = rows
  return { messageinboundMessagelists: m };
};

export const getMessageinboundMessagelistById = async (id: MessageinboundMessagelistId) => {
  const { session } = await getUserAuth();
  const { id: messageinboundMessagelistId } = messageinboundMessagelistIdSchema.parse({ id });
  const [row] = await db.select().from(messageinboundMessagelists).where(and(eq(messageinboundMessagelists.id, messageinboundMessagelistId), eq(messageinboundMessagelists.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageinboundMessagelist: m };
};


