"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageConversation,
  deleteMessageConversation,
  updateMessageConversation,
} from "@/lib/api/messageConversations/mutations";
import {
  MessageConversationId,
  NewMessageConversationParams,
  UpdateMessageConversationParams,
  messageConversationIdSchema,
  insertMessageConversationParams,
  updateMessageConversationParams,
} from "@/lib/db/schema/messageConversations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageConversations = () => revalidatePath("/message-conversations");

export const createMessageConversationAction = async (input: NewMessageConversationParams) => {
  try {
    const payload = insertMessageConversationParams.parse(input);
    await createMessageConversation(payload);
    revalidateMessageConversations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageConversationAction = async (input: UpdateMessageConversationParams) => {
  try {
    const payload = updateMessageConversationParams.parse(input);
    await updateMessageConversation(payload.id, payload);
    revalidateMessageConversations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageConversationAction = async (input: MessageConversationId) => {
  try {
    const payload = messageConversationIdSchema.parse({ id: input });
    await deleteMessageConversation(payload.id);
    revalidateMessageConversations();
  } catch (e) {
    return handleErrors(e);
  }
};
