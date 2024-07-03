"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageUsersBlocked,
  deleteMessageUsersBlocked,
  updateMessageUsersBlocked,
} from "@/lib/api/messageUsersBlockeds/mutations";
import {
  MessageUsersBlockedId,
  NewMessageUsersBlockedParams,
  UpdateMessageUsersBlockedParams,
  messageUsersBlockedIdSchema,
  insertMessageUsersBlockedParams,
  updateMessageUsersBlockedParams,
} from "@/lib/db/schema/messageUsersBlockeds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageUsersBlockeds = () => revalidatePath("/message-users-blockeds");

export const createMessageUsersBlockedAction = async (input: NewMessageUsersBlockedParams) => {
  try {
    const payload = insertMessageUsersBlockedParams.parse(input);
    await createMessageUsersBlocked(payload);
    revalidateMessageUsersBlockeds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageUsersBlockedAction = async (input: UpdateMessageUsersBlockedParams) => {
  try {
    const payload = updateMessageUsersBlockedParams.parse(input);
    await updateMessageUsersBlocked(payload.id, payload);
    revalidateMessageUsersBlockeds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageUsersBlockedAction = async (input: MessageUsersBlockedId) => {
  try {
    const payload = messageUsersBlockedIdSchema.parse({ id: input });
    await deleteMessageUsersBlocked(payload.id);
    revalidateMessageUsersBlockeds();
  } catch (e) {
    return handleErrors(e);
  }
};