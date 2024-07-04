"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageContactRequest,
  deleteMessageContactRequest,
  updateMessageContactRequest,
} from "../api/messageContactRequests/mutations";
import {
  insertMessageContactRequestParams,
  MessageContactRequestId,
  messageContactRequestIdSchema,
  NewMessageContactRequestParams,
  UpdateMessageContactRequestParams,
  updateMessageContactRequestParams,
} from "../db/schema/messageContactRequests";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageContactRequests = () =>
  revalidatePath("/message-contact-requests");

export const createMessageContactRequestAction = async (
  input: NewMessageContactRequestParams,
) => {
  try {
    const payload = insertMessageContactRequestParams.parse(input);
    await createMessageContactRequest(payload);
    revalidateMessageContactRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageContactRequestAction = async (
  input: UpdateMessageContactRequestParams,
) => {
  try {
    const payload = updateMessageContactRequestParams.parse(input);
    await updateMessageContactRequest(payload.id, payload);
    revalidateMessageContactRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageContactRequestAction = async (
  input: MessageContactRequestId,
) => {
  try {
    const payload = messageContactRequestIdSchema.parse({ id: input });
    await deleteMessageContactRequest(payload.id);
    revalidateMessageContactRequests();
  } catch (e) {
    return handleErrors(e);
  }
};
