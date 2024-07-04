"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageConversationMember,
  deleteMessageConversationMember,
  updateMessageConversationMember,
} from "../api/messageConversationMembers/mutations";
import {
  insertMessageConversationMemberParams,
  MessageConversationMemberId,
  messageConversationMemberIdSchema,
  NewMessageConversationMemberParams,
  UpdateMessageConversationMemberParams,
  updateMessageConversationMemberParams,
} from "../db/schema/messageConversationMembers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageConversationMembers = () =>
  revalidatePath("/message-conversation-members");

export const createMessageConversationMemberAction = async (
  input: NewMessageConversationMemberParams,
) => {
  try {
    const payload = insertMessageConversationMemberParams.parse(input);
    await createMessageConversationMember(payload);
    revalidateMessageConversationMembers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageConversationMemberAction = async (
  input: UpdateMessageConversationMemberParams,
) => {
  try {
    const payload = updateMessageConversationMemberParams.parse(input);
    await updateMessageConversationMember(payload.id, payload);
    revalidateMessageConversationMembers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageConversationMemberAction = async (
  input: MessageConversationMemberId,
) => {
  try {
    const payload = messageConversationMemberIdSchema.parse({ id: input });
    await deleteMessageConversationMember(payload.id);
    revalidateMessageConversationMembers();
  } catch (e) {
    return handleErrors(e);
  }
};
