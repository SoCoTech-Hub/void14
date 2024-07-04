"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageConversationAction,
  deleteMessageConversationAction,
  updateMessageConversationAction,
} from "../api/messageConversationActions/mutations";
import {
  insertMessageConversationActionParams,
  MessageConversationActionId,
  messageConversationActionIdSchema,
  NewMessageConversationActionParams,
  UpdateMessageConversationActionParams,
  updateMessageConversationActionParams,
} from "../db/schema/messageConversationActions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageConversationActions = () =>
  revalidatePath("/message-conversation-actions");

export const createMessageConversationActionAction = async (
  input: NewMessageConversationActionParams,
) => {
  try {
    const payload = insertMessageConversationActionParams.parse(input);
    await createMessageConversationAction(payload);
    revalidateMessageConversationActions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageConversationActionAction = async (
  input: UpdateMessageConversationActionParams,
) => {
  try {
    const payload = updateMessageConversationActionParams.parse(input);
    await updateMessageConversationAction(payload.id, payload);
    revalidateMessageConversationActions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageConversationActionAction = async (
  input: MessageConversationActionId,
) => {
  try {
    const payload = messageConversationActionIdSchema.parse({ id: input });
    await deleteMessageConversationAction(payload.id);
    revalidateMessageConversationActions();
  } catch (e) {
    return handleErrors(e);
  }
};
