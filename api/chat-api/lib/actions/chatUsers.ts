"use server";

import { revalidatePath } from "next/cache";
import {
  createChatUser,
  deleteChatUser,
  updateChatUser,
} from "@/lib/api/chatUsers/mutations";
import {
  ChatUserId,
  NewChatUserParams,
  UpdateChatUserParams,
  chatUserIdSchema,
  insertChatUserParams,
  updateChatUserParams,
} from "@/lib/db/schema/chatUsers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateChatUsers = () => revalidatePath("/chat-users");

export const createChatUserAction = async (input: NewChatUserParams) => {
  try {
    const payload = insertChatUserParams.parse(input);
    await createChatUser(payload);
    revalidateChatUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateChatUserAction = async (input: UpdateChatUserParams) => {
  try {
    const payload = updateChatUserParams.parse(input);
    await updateChatUser(payload.id, payload);
    revalidateChatUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteChatUserAction = async (input: ChatUserId) => {
  try {
    const payload = chatUserIdSchema.parse({ id: input });
    await deleteChatUser(payload.id);
    revalidateChatUsers();
  } catch (e) {
    return handleErrors(e);
  }
};