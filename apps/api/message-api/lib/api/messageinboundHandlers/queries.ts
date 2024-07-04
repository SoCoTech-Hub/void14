import { eq } from "drizzle-orm";

import type { MessageinboundHandlerId } from "../db/schema/messageinboundHandlers";
import { db } from "../db/index";
import {
  messageinboundHandlerIdSchema,
  messageinboundHandlers,
} from "../db/schema/messageinboundHandlers";

export const getMessageinboundHandlers = async () => {
  const rows = await db.select().from(messageinboundHandlers);
  const m = rows;
  return { messageinboundHandlers: m };
};

export const getMessageinboundHandlerById = async (
  id: MessageinboundHandlerId,
) => {
  const { id: messageinboundHandlerId } = messageinboundHandlerIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(messageinboundHandlers)
    .where(eq(messageinboundHandlers.id, messageinboundHandlerId));
  if (row === undefined) return {};
  const m = row;
  return { messageinboundHandler: m };
};
