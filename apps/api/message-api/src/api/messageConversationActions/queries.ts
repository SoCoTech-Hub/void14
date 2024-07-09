import { and, eq } from "drizzle-orm";

import type { MessageConversationActionId } from "@soco/message-db/schema/messageConversationActions";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/message-db/index";
import {
  messageConversationActionIdSchema,
  messageConversationActions,
} from "@soco/message-db/schema/messageConversationActions";

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
