"use server";

import { revalidatePath } from "next/cache";
import {
  createChatMessage,
  deleteChatMessage,
  updateChatMessage,
} from "@/lib/api/chatMessages/mutations";
import {
  ChatMessageId,
  NewChatMessageParams,
  UpdateChatMessageParams,
  chatMessageIdSchema,
  insertChatMessageParams,
  updateChatMessageParams,
} from "@/lib/db/schema/chatMessages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChatMessages = () => revalidatePath("/chat-messages");

export const createChatMessageAction = async (input: NewChatMessageParams) => {
  try {
    const payload = insertChatMessageParams.parse(input);
    await createChatMessage(payload);
    revalidateChatMessages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChatMessageAction = async (input: UpdateChatMessageParams) => {
  try {
    const payload = updateChatMessageParams.parse(input);
    await updateChatMessage(payload.id, payload);
    revalidateChatMessages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChatMessageAction = async (input: ChatMessageId) => {
  try {
    const payload = chatMessageIdSchema.parse({ id: input });
    await deleteChatMessage(payload.id);
    revalidateChatMessages();
  } catch (e) {
    return handleErrors(e);
  }
};
