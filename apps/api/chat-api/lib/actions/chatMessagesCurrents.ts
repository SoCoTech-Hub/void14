"use server";

import { revalidatePath } from "next/cache";

import {
  createChatMessagesCurrent,
  deleteChatMessagesCurrent,
  updateChatMessagesCurrent,
} from "../api/chatMessagesCurrents/mutations";
import {
  ChatMessagesCurrentId,
  chatMessagesCurrentIdSchema,
  insertChatMessagesCurrentParams,
  NewChatMessagesCurrentParams,
  UpdateChatMessagesCurrentParams,
  updateChatMessagesCurrentParams,
} from "../db/schema/chatMessagesCurrents";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChatMessagesCurrents = () =>
  revalidatePath("/chat-messages-currents");

export const createChatMessagesCurrentAction = async (
  input: NewChatMessagesCurrentParams,
) => {
  try {
    const payload = insertChatMessagesCurrentParams.parse(input);
    await createChatMessagesCurrent(payload);
    revalidateChatMessagesCurrents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChatMessagesCurrentAction = async (
  input: UpdateChatMessagesCurrentParams,
) => {
  try {
    const payload = updateChatMessagesCurrentParams.parse(input);
    await updateChatMessagesCurrent(payload.id, payload);
    revalidateChatMessagesCurrents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChatMessagesCurrentAction = async (
  input: ChatMessagesCurrentId,
) => {
  try {
    const payload = chatMessagesCurrentIdSchema.parse({ id: input });
    await deleteChatMessagesCurrent(payload.id);
    revalidateChatMessagesCurrents();
  } catch (e) {
    return handleErrors(e);
  }
};
