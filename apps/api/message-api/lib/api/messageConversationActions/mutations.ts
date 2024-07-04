import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertMessageConversationActionSchema,
  MessageConversationActionId,
  messageConversationActionIdSchema,
  messageConversationActions,
  NewMessageConversationActionParams,
  UpdateMessageConversationActionParams,
  updateMessageConversationActionSchema,
} from "../db/schema/messageConversationActions";

export const createMessageConversationAction = async (
  messageConversationAction: NewMessageConversationActionParams,
) => {
  const { session } = await getUserAuth();
  const newMessageConversationAction =
    insertMessageConversationActionSchema.parse({
      ...messageConversationAction,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .insert(messageConversationActions)
      .values(newMessageConversationAction)
      .returning();
    return { messageConversationAction: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMessageConversationAction = async (
  id: MessageConversationActionId,
  messageConversationAction: UpdateMessageConversationActionParams,
) => {
  const { session } = await getUserAuth();
  const { id: messageConversationActionId } =
    messageConversationActionIdSchema.parse({ id });
  const newMessageConversationAction =
    updateMessageConversationActionSchema.parse({
      ...messageConversationAction,
      userId: session?.user.id!,
    });
  try {
    const [m] = await db
      .update(messageConversationActions)
      .set({ ...newMessageConversationAction, updatedAt: new Date() })
      .where(
        and(
          eq(messageConversationActions.id, messageConversationActionId!),
          eq(messageConversationActions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageConversationAction: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMessageConversationAction = async (
  id: MessageConversationActionId,
) => {
  const { session } = await getUserAuth();
  const { id: messageConversationActionId } =
    messageConversationActionIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(messageConversationActions)
      .where(
        and(
          eq(messageConversationActions.id, messageConversationActionId!),
          eq(messageConversationActions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { messageConversationAction: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
