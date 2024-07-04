"use server";

import { revalidatePath } from "next/cache";

import {
  createInmailResponse,
  deleteInmailResponse,
  updateInmailResponse,
} from "../api/inmailResponses/mutations";
import {
  InmailResponseId,
  inmailResponseIdSchema,
  insertInmailResponseParams,
  NewInmailResponseParams,
  UpdateInmailResponseParams,
  updateInmailResponseParams,
} from "../db/schema/inmailResponses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateInmailResponses = () => revalidatePath("/inmail-responses");

export const createInmailResponseAction = async (
  input: NewInmailResponseParams,
) => {
  try {
    const payload = insertInmailResponseParams.parse(input);
    await createInmailResponse(payload);
    revalidateInmailResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateInmailResponseAction = async (
  input: UpdateInmailResponseParams,
) => {
  try {
    const payload = updateInmailResponseParams.parse(input);
    await updateInmailResponse(payload.id, payload);
    revalidateInmailResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteInmailResponseAction = async (input: InmailResponseId) => {
  try {
    const payload = inmailResponseIdSchema.parse({ id: input });
    await deleteInmailResponse(payload.id);
    revalidateInmailResponses();
  } catch (e) {
    return handleErrors(e);
  }
};
