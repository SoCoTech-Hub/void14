import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { MessageConversationActionId } from "../db/schema/messageConversationActions";
import { db } from "../db/index";
import {
  messageConversationActionIdSchema,
  messageConversationActions,
} from "../db/schema/messageConversationActions";

export const getMessageConversationActions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageConversationActions)
    .where(eq(messageConversationActions.userId, session?.user.id!));
  const m = rows;
  return { messageConversationActions: m };
};

export const getMessageConversationActionById = async (
  id: MessageConversationActionId,
) => {
  const { session } = await getUserAuth();
  const { id: messageConversationActionId } =
    messageConversationActionIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messageConversationActions)
    .where(
      and(
        eq(messageConversationActions.id, messageConversationActionId),
        eq(messageConversationActions.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageConversationAction: m };
};
