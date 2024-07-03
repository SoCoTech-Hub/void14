"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageinboundMessagelist,
  deleteMessageinboundMessagelist,
  updateMessageinboundMessagelist,
} from "@/lib/api/messageinboundMessagelists/mutations";
import {
  MessageinboundMessagelistId,
  NewMessageinboundMessagelistParams,
  UpdateMessageinboundMessagelistParams,
  messageinboundMessagelistIdSchema,
  insertMessageinboundMessagelistParams,
  updateMessageinboundMessagelistParams,
} from "@/lib/db/schema/messageinboundMessagelists";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageinboundMessagelists = () => revalidatePath("/messageinbound-messagelists");

export const createMessageinboundMessagelistAction = async (input: NewMessageinboundMessagelistParams) => {
  try {
    const payload = insertMessageinboundMessagelistParams.parse(input);
    await createMessageinboundMessagelist(payload);
    revalidateMessageinboundMessagelists();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageinboundMessagelistAction = async (input: UpdateMessageinboundMessagelistParams) => {
  try {
    const payload = updateMessageinboundMessagelistParams.parse(input);
    await updateMessageinboundMessagelist(payload.id, payload);
    revalidateMessageinboundMessagelists();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageinboundMessagelistAction = async (input: MessageinboundMessagelistId) => {
  try {
    const payload = messageinboundMessagelistIdSchema.parse({ id: input });
    await deleteMessageinboundMessagelist(payload.id);
    revalidateMessageinboundMessagelists();
  } catch (e) {
    return handleErrors(e);
  }
};