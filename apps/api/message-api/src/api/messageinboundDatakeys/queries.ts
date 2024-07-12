import type { MessageinboundDatakeyId } from "@soco/message-db/schema/messageinboundDatakeys";
import { eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messageinboundDatakeyIdSchema,
  messageinboundDatakeys,
} from "@soco/message-db/schema/messageinboundDatakeys";

export const getMessageinboundDatakeys = async () => {
  const rows = await db.select().from(messageinboundDatakeys);
  const m = rows;
  return { messageinboundDatakeys: m };
};

export const getMessageinboundDatakeyById = async (
  id: MessageinboundDatakeyId,
) => {
  const { id: messageinboundDatakeyId } = messageinboundDatakeyIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(messageinboundDatakeys)
    .where(eq(messageinboundDatakeys.id, messageinboundDatakeyId));
  if (row === undefined) return {};
  const m = row;
  return { messageinboundDatakey: m };
};
