import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { MessageContactRequestId } from "../db/schema/messageContactRequests";
import { db } from "../db/index";
import {
  messageContactRequestIdSchema,
  messageContactRequests,
} from "../db/schema/messageContactRequests";

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
