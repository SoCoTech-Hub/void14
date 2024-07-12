import type { MessageConversationMemberId } from "@soco/message-db/schema/messageConversationMembers";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/message-db";
import { db } from "@soco/message-db/client";
import {
  messageConversationMemberIdSchema,
  messageConversationMembers,
} from "@soco/message-db/schema/messageConversationMembers";

export const getMessageConversationMembers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(messageConversationMembers)
    .where(eq(messageConversationMembers.userId, session?.user.id!));
  const m = rows;
  return { messageConversationMembers: m };
};

export const getMessageConversationMemberById = async (
  id: MessageConversationMemberId,
) => {
  const { session } = await getUserAuth();
  const { id: messageConversationMemberId } =
    messageConversationMemberIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(messageConversationMembers)
    .where(
      and(
        eq(messageConversationMembers.id, messageConversationMemberId),
        eq(messageConversationMembers.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const m = row;
  return { messageConversationMember: m };
};
