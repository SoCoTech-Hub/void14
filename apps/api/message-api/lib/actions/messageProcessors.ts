"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageProcessor,
  deleteMessageProcessor,
  updateMessageProcessor,
} from "../api/messageProcessors/mutations";
import {
  insertMessageProcessorParams,
  MessageProcessorId,
  messageProcessorIdSchema,
  NewMessageProcessorParams,
  UpdateMessageProcessorParams,
  updateMessageProcessorParams,
} from "../db/schema/messageProcessors";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageProcessors = () => revalidatePath("/message-processors");

export const createMessageProcessorAction = async (
  input: NewMessageProcessorParams,
) => {
  try {
    const payload = insertMessageProcessorParams.parse(input);
    await createMessageProcessor(payload);
    revalidateMessageProcessors();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageProcessorAction = async (
  input: UpdateMessageProcessorParams,
) => {
  try {
    const payload = updateMessageProcessorParams.parse(input);
    await updateMessageProcessor(payload.id, payload);
    revalidateMessageProcessors();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageProcessorAction = async (
  input: MessageProcessorId,
) => {
  try {
    const payload = messageProcessorIdSchema.parse({ id: input });
    await deleteMessageProcessor(payload.id);
    revalidateMessageProcessors();
  } catch (e) {
    return handleErrors(e);
  }
};
