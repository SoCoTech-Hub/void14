"use server";

import { revalidatePath } from "next/cache";
import {
  createMassMailMessage,
  deleteMassMailMessage,
  updateMassMailMessage,
} from "@/lib/api/massMailMessages/mutations";
import {
  MassMailMessageId,
  NewMassMailMessageParams,
  UpdateMassMailMessageParams,
  massMailMessageIdSchema,
  insertMassMailMessageParams,
  updateMassMailMessageParams,
} from "@/lib/db/schema/massMailMessages";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMassMailMessages = () => revalidatePath("/mass-mail-messages");

export const createMassMailMessageAction = async (input: NewMassMailMessageParams) => {
  try {
    const payload = insertMassMailMessageParams.parse(input);
    await createMassMailMessage(payload);
    revalidateMassMailMessages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMassMailMessageAction = async (input: UpdateMassMailMessageParams) => {
  try {
    const payload = updateMassMailMessageParams.parse(input);
    await updateMassMailMessage(payload.id, payload);
    revalidateMassMailMessages();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMassMailMessageAction = async (input: MassMailMessageId) => {
  try {
    const payload = massMailMessageIdSchema.parse({ id: input });
    await deleteMassMailMessage(payload.id);
    revalidateMassMailMessages();
  } catch (e) {
    return handleErrors(e);
  }
};