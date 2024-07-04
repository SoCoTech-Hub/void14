"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageUserAction,
  deleteMessageUserAction,
  updateMessageUserAction,
} from "../api/messageUserActions/mutations";
import {
  insertMessageUserActionParams,
  MessageUserActionId,
  messageUserActionIdSchema,
  NewMessageUserActionParams,
  UpdateMessageUserActionParams,
  updateMessageUserActionParams,
} from "../db/schema/messageUserActions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageUserActions = () =>
  revalidatePath("/message-user-actions");

export const createMessageUserActionAction = async (
  input: NewMessageUserActionParams,
) => {
  try {
    const payload = insertMessageUserActionParams.parse(input);
    await createMessageUserAction(payload);
    revalidateMessageUserActions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageUserActionAction = async (
  input: UpdateMessageUserActionParams,
) => {
  try {
    const payload = updateMessageUserActionParams.parse(input);
    await updateMessageUserAction(payload.id, payload);
    revalidateMessageUserActions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageUserActionAction = async (
  input: MessageUserActionId,
) => {
  try {
    const payload = messageUserActionIdSchema.parse({ id: input });
    await deleteMessageUserAction(payload.id);
    revalidateMessageUserActions();
  } catch (e) {
    return handleErrors(e);
  }
};
