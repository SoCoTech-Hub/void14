import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { MessageUsersBlockedId } from "../../db/schema/messageUsersBlockeds";
import { db } from "../../db/index";
import {
  messageUsersBlockedIdSchema,
  messageUsersBlockeds,
} from "../../db/schema/messageUsersBlockeds";

export const getMessageUsersBlockeds = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageUsersBlockeds)
    .where(eq(messageUsersBlockeds.userId, session?.user.id!));
  const m = rows;
  return { messageUsersBlockeds: m };
};

export const getMessageUsersBlockedById = async (id: MessageUsersBlockedId) => {
  const { session } = await getUserAuth();
  const { id: messageUsersBlockedId } = messageUsersBlockedIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(messageUsersBlockeds)
    .where(
      and(
        eq(messageUsersBlockeds.id, messageUsersBlockedId),
        eq(messageUsersBlockeds.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageUsersBlocked: m };
};
