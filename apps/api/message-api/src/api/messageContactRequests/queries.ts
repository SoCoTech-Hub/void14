import type { MessageContactRequestId } from "@soco/message-db/schema/messageContactRequests";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messageContactRequestIdSchema,
  messageContactRequests,
} from "@soco/message-db/schema/messageContactRequests";

export const getMessageContactRequests = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageContactRequests)
    .where(eq(messageContactRequests.userId, session?.user.id!));
  const m = rows;
  return { messageContactRequests: m };
};

export const getMessageContactRequestById = async (
  id: MessageContactRequestId,
) => {
  const { session } = await getUserAuth();
  const { id: messageContactRequestId } = messageContactRequestIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(messageContactRequests)
    .where(
      and(
        eq(messageContactRequests.id, messageContactRequestId),
        eq(messageContactRequests.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageContactRequest: m };
};
