import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type MessageConversationMemberId, messageConversationMemberIdSchema, messageConversationMembers } from "@/lib/db/schema/messageConversationMembers";

export const getMessageConversationMembers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(messageConversationMembers).where(eq(messageConversationMembers.userId, session?.user.id!));
  const m = rows
  return { messageConversationMembers: m };
};

export const getMessageConversationMemberById = async (id: MessageConversationMemberId) => {
  const { session } = await getUserAuth();
  const { id: messageConversationMemberId } = messageConversationMemberIdSchema.parse({ id });
  const [row] = await db.select().from(messageConversationMembers).where(and(eq(messageConversationMembers.id, messageConversationMemberId), eq(messageConversationMembers.userId, session?.user.id!)));
  if (row === undefined) return {};
  const m = row;
  return { messageConversationMember: m };
};


