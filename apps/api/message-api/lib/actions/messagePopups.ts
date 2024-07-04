"use server";

import { revalidatePath } from "next/cache";

import {
  createMessagePopup,
  deleteMessagePopup,
  updateMessagePopup,
} from "../api/messagePopups/mutations";
import {
  insertMessagePopupParams,
  MessagePopupId,
  messagePopupIdSchema,
  NewMessagePopupParams,
  UpdateMessagePopupParams,
  updateMessagePopupParams,
} from "../db/schema/messagePopups";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessagePopups = () => revalidatePath("/message-popups");

export const createMessagePopupAction = async (
  input: NewMessagePopupParams,
) => {
  try {
    const payload = insertMessagePopupParams.parse(input);
    await createMessagePopup(payload);
    revalidateMessagePopups();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessagePopupAction = async (
  input: UpdateMessagePopupParams,
) => {
  try {
    const payload = updateMessagePopupParams.parse(input);
    await updateMessagePopup(payload.id, payload);
    revalidateMessagePopups();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessagePopupAction = async (input: MessagePopupId) => {
  try {
    const payload = messagePopupIdSchema.parse({ id: input });
    await deleteMessagePopup(payload.id);
    revalidateMessagePopups();
  } catch (e) {
    return handleErrors(e);
  }
};
