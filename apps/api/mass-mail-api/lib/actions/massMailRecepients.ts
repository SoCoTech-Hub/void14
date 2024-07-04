"use server";

import { revalidatePath } from "next/cache";

import {
  createMassMailRecipient,
  deleteMassMailRecipient,
  updateMassMailRecipient,
} from "../api/massMailRecipients/mutations";
import {
  insertMassMailRecipientParams,
  MassMailRecipientId,
  massMailRecipientIdSchema,
  NewMassMailRecipientParams,
  UpdateMassMailRecipientParams,
  updateMassMailRecipientParams,
} from "../db/schema/massMailRecipients";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMassMailRecipients = () =>
  revalidatePath("/mass-mail-recipients");

export const createMassMailRecipientAction = async (
  input: NewMassMailRecipientParams,
) => {
  try {
    const payload = insertMassMailRecipientParams.parse(input);
    await createMassMailRecipient(payload);
    revalidateMassMailRecipients();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMassMailRecipientAction = async (
  input: UpdateMassMailRecipientParams,
) => {
  try {
    const payload = updateMassMailRecipientParams.parse(input);
    await updateMassMailRecipient(payload.id, payload);
    revalidateMassMailRecipients();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMassMailRecipientAction = async (
  input: MassMailRecipientId,
) => {
  try {
    const payload = massMailRecipientIdSchema.parse({ id: input });
    await deleteMassMailRecipient(payload.id);
    revalidateMassMailRecipients();
  } catch (e) {
    return handleErrors(e);
  }
};
