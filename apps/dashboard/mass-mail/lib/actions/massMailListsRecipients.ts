"use server";

import { revalidatePath } from "next/cache";
import {
  createMassMailListsRecipient,
  deleteMassMailListsRecipient,
  updateMassMailListsRecipient,
} from "@/lib/api/massMailListsRecipients/mutations";
import {
  MassMailListsRecipientId,
  NewMassMailListsRecipientParams,
  UpdateMassMailListsRecipientParams,
  massMailListsRecipientIdSchema,
  insertMassMailListsRecipientParams,
  updateMassMailListsRecipientParams,
} from "@/lib/db/schema/massMailListsRecipients";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMassMailListsRecipients = () => revalidatePath("/mass-mail-lists-recipients");

export const createMassMailListsRecipientAction = async (input: NewMassMailListsRecipientParams) => {
  try {
    const payload = insertMassMailListsRecipientParams.parse(input);
    await createMassMailListsRecipient(payload);
    revalidateMassMailListsRecipients();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMassMailListsRecipientAction = async (input: UpdateMassMailListsRecipientParams) => {
  try {
    const payload = updateMassMailListsRecipientParams.parse(input);
    await updateMassMailListsRecipient(payload.id, payload);
    revalidateMassMailListsRecipients();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMassMailListsRecipientAction = async (input: MassMailListsRecipientId) => {
  try {
    const payload = massMailListsRecipientIdSchema.parse({ id: input });
    await deleteMassMailListsRecipient(payload.id);
    revalidateMassMailListsRecipients();
  } catch (e) {
    return handleErrors(e);
  }
};
