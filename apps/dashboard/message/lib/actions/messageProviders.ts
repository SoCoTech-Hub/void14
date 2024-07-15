"use server";

import { revalidatePath } from "next/cache";
import {
  createMessageProvider,
  deleteMessageProvider,
  updateMessageProvider,
} from "@/lib/api/messageProviders/mutations";
import {
  MessageProviderId,
  NewMessageProviderParams,
  UpdateMessageProviderParams,
  messageProviderIdSchema,
  insertMessageProviderParams,
  updateMessageProviderParams,
} from "@/lib/db/schema/messageProviders";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMessageProviders = () => revalidatePath("/message-providers");

export const createMessageProviderAction = async (input: NewMessageProviderParams) => {
  try {
    const payload = insertMessageProviderParams.parse(input);
    await createMessageProvider(payload);
    revalidateMessageProviders();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMessageProviderAction = async (input: UpdateMessageProviderParams) => {
  try {
    const payload = updateMessageProviderParams.parse(input);
    await updateMessageProvider(payload.id, payload);
    revalidateMessageProviders();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMessageProviderAction = async (input: MessageProviderId) => {
  try {
    const payload = messageProviderIdSchema.parse({ id: input });
    await deleteMessageProvider(payload.id);
    revalidateMessageProviders();
  } catch (e) {
    return handleErrors(e);
  }
};
