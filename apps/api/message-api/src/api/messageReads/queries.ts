import { and, eq } from "drizzle-orm";

import type { MessageReadId } from "@soco/message-db/schema/messageReads";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/message-db/index";
import {
  messageReadIdSchema,
  messageReads,
} from "@soco/message-db/schema/messageReads";

export const getMessageReads = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageReads)
    .where(eq(messageReads.userId, session?.user.id!));
  const m = rows;
  return { messageReads: m };
};

export const getMessageReadById = async (id: MessageReadId) => {
  const { session } = await getUserAuth();
  const { id: messageReadId } = messageReadIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messageReads)
    .where(
      and(
        eq(messageReads.id, messageReadId),
        eq(messageReads.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageRead: m };
};
