import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertMessageConversationMemberSchema,
  MessageConversationMemberId,
  messageConversationMemberIdSchema,
  messageConversationMembers,
  NewMessageConversationMemberParams,
  UpdateMessageConversationMemberParams,
  updateMessageConversationMemberSchema,
} from "../db/schema/messageConversationMembers";

export const createMessageConversationMember = async (
  messageConversationMember: NewMessageConversationMemberParams,
) => {
  const { session } = await getUserAuth();
  const newMessageConversationMember =
    insertMessageConversationMemberSchema.parse({
      ...messageConversationMember,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .insert(messageConversationMembers)
      .values(newMessageConversationMember)
      .returning();
    return { messageConversationMember: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageConversationMember = async (
  id: MessageConversationMemberId,
  messageConversationMember: UpdateMessageConversationMemberParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageConversationMemberId } =
    messageConversationMemberIdSchema.parse({ id });
  const newMessageConversationMember =
    updateMessageConversationMemberSchema.parse({
      ...messageConversationMember,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .update(messageConversationMembers)
      .set({ ...newMessageConversationMember, updatedAt: new Date() })
      .where(
        and(
          eq(messageConversationMembers.id, messageConversationMemberId!),
          eq(messageConversationMembers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageConversationMember: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageConversationMember = async (
  id: MessageConversationMemberId,
) => {
  const { session } = await getUserAuth();
  const { id: messageConversationMemberId } =
    messageConversationMemberIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messageConversationMembers)
      .where(
        and(
          eq(messageConversationMembers.id, messageConversationMemberId!),
          eq(messageConversationMembers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageConversationMember: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};