"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageRead,
  deleteMessageRead,
  updateMessageRead,
} from "@/lib/api/messageReads/mutations";
import {
  MessageReadId,
  NewMessageReadParams,
  UpdateMessageReadParams,
  messageReadIdSchema,
  insertMessageReadParams,
  updateMessageReadParams,
} from "@/lib/db/schema/messageReads";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageReads = () => revalidatePath("/message-reads");

export const createMessageReadAction = async (input: NewMessageReadParams) => {
  try {
    const payload = insertMessageReadParams.parse(input);
    await createMessageRead(payload);
    revalidateMessageReads();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageReadAction = async (input: UpdateMessageReadParams) => {
  try {
    const payload = updateMessageReadParams.parse(input);
    await updateMessageRead(payload.id, payload);
    revalidateMessageReads();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageReadAction = async (input: MessageReadId) => {
  try {
    const payload = messageReadIdSchema.parse({ id: input });
    await deleteMessageRead(payload.id);
    revalidateMessageReads();
  } catch (e) {
    return handleErrors(e);
  }
};
