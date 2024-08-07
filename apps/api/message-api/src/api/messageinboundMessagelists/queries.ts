import type { MessageinboundMessagelistId } from "@soco/message-db/schema/messageinboundMessagelists";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messageinboundMessagelistIdSchema,
  messageinboundMessagelists,
} from "@soco/message-db/schema/messageinboundMessagelists";

export const getMessageinboundMessagelists = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageinboundMessagelists)
    .where(eq(messageinboundMessagelists.userId, session?.user.id!));
  const m = rows;
  return { messageinboundMessagelists: m };
};

export const getMessageinboundMessagelistById = async (
  id: MessageinboundMessagelistId,
) => {
  const { session } = await getUserAuth();
  const { id: messageinboundMessagelistId } =
    messageinboundMessagelistIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messageinboundMessagelists)
    .where(
      and(
        eq(messageinboundMessagelists.id, messageinboundMessagelistId),
        eq(messageinboundMessagelists.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageinboundMessagelist: m };
};
