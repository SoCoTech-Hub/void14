"use server";

import { revalidatePath } from "next/cache";

import {
  createMessageinboundHandler,
  deleteMessageinboundHandler,
  updateMessageinboundHandler,
} from "../api/messageinboundHandlers/mutations";
import {
  insertMessageinboundHandlerParams,
  MessageinboundHandlerId,
  messageinboundHandlerIdSchema,
  NewMessageinboundHandlerParams,
  UpdateMessageinboundHandlerParams,
  updateMessageinboundHandlerParams,
} from "../db/schema/messageinboundHandlers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageinboundHandlers = () =>
  revalidatePath("/messageinbound-handlers");

export const createMessageinboundHandlerAction = async (
  input: NewMessageinboundHandlerParams,
) => {
  try {
    const payload = insertMessageinboundHandlerParams.parse(input);
    await createMessageinboundHandler(payload);
    revalidateMessageinboundHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageinboundHandlerAction = async (
  input: UpdateMessageinboundHandlerParams,
) => {
  try {
    const payload = updateMessageinboundHandlerParams.parse(input);
    await updateMessageinboundHandler(payload.id, payload);
    revalidateMessageinboundHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageinboundHandlerAction = async (
  input: MessageinboundHandlerId,
) => {
  try {
    const payload = messageinboundHandlerIdSchema.parse({ id: input });
    await deleteMessageinboundHandler(payload.id);
    revalidateMessageinboundHandlers();
  } catch (e) {
    return handleErrors(e);
  }
};
