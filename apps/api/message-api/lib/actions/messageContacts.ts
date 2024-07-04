"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageContact,
  deleteMessageContact,
  updateMessageContact,
} from "../api/messageContacts/mutations";
import {
  insertMessageContactParams,
  MessageContactId,
  messageContactIdSchema,
  NewMessageContactParams,
  UpdateMessageContactParams,
  updateMessageContactParams,
} from "../db/schema/messageContacts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageContacts = () => revalidatePath("/message-contacts");

export const createMessageContactAction = async (
  input: NewMessageContactParams,
) => {
  try {
    const payload = insertMessageContactParams.parse(input);
    await createMessageContact(payload);
    revalidateMessageContacts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageContactAction = async (
  input: UpdateMessageContactParams,
) => {
  try {
    const payload = updateMessageContactParams.parse(input);
    await updateMessageContact(payload.id, payload);
    revalidateMessageContacts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageContactAction = async (input: MessageContactId) => {
  try {
    const payload = messageContactIdSchema.parse({ id: input });
    await deleteMessageContact(payload.id);
    revalidateMessageContacts();
  } catch (e) {
    return handleErrors(e);
  }
};
