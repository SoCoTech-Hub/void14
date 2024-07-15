"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageinboundDatakey,
  deleteMessageinboundDatakey,
  updateMessageinboundDatakey,
} from "@/lib/api/messageinboundDatakeys/mutations";
import {
  MessageinboundDatakeyId,
  NewMessageinboundDatakeyParams,
  UpdateMessageinboundDatakeyParams,
  messageinboundDatakeyIdSchema,
  insertMessageinboundDatakeyParams,
  updateMessageinboundDatakeyParams,
} from "@/lib/db/schema/messageinboundDatakeys";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageinboundDatakeys = () => revalidatePath("/messageinbound-datakeys");

export const createMessageinboundDatakeyAction = async (input: NewMessageinboundDatakeyParams) => {
  try {
    const payload = insertMessageinboundDatakeyParams.parse(input);
    await createMessageinboundDatakey(payload);
    revalidateMessageinboundDatakeys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageinboundDatakeyAction = async (input: UpdateMessageinboundDatakeyParams) => {
  try {
    const payload = updateMessageinboundDatakeyParams.parse(input);
    await updateMessageinboundDatakey(payload.id, payload);
    revalidateMessageinboundDatakeys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageinboundDatakeyAction = async (input: MessageinboundDatakeyId) => {
  try {
    const payload = messageinboundDatakeyIdSchema.parse({ id: input });
    await deleteMessageinboundDatakey(payload.id);
    revalidateMessageinboundDatakeys();
  } catch (e) {
    return handleErrors(e);
  }
};
