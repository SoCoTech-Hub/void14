"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageEmailMessage,
  deleteMessageEmailMessage,
  updateMessageEmailMessage,
} from "@/lib/api/messageEmailMessages/mutations";
import {
  MessageEmailMessageId,
  NewMessageEmailMessageParams,
  UpdateMessageEmailMessageParams,
  messageEmailMessageIdSchema,
  insertMessageEmailMessageParams,
  updateMessageEmailMessageParams,
} from "@/lib/db/schema/messageEmailMessages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageEmailMessages = () => revalidatePath("/message-email-messages");

export const createMessageEmailMessageAction = async (input: NewMessageEmailMessageParams) => {
  try {
    const payload = insertMessageEmailMessageParams.parse(input);
    await createMessageEmailMessage(payload);
    revalidateMessageEmailMessages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageEmailMessageAction = async (input: UpdateMessageEmailMessageParams) => {
  try {
    const payload = updateMessageEmailMessageParams.parse(input);
    await updateMessageEmailMessage(payload.id, payload);
    revalidateMessageEmailMessages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageEmailMessageAction = async (input: MessageEmailMessageId) => {
  try {
    const payload = messageEmailMessageIdSchema.parse({ id: input });
    await deleteMessageEmailMessage(payload.id);
    revalidateMessageEmailMessages();
  } catch (e) {
    return handleErrors(e);
  }
};
