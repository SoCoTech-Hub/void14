"use server";

import { revalidatePath } from "next/cache";
import {
  createInmail,
  deleteInmail,
  updateInmail,
} from "@/lib/api/inmails/mutations";
import {
  InmailId,
  NewInmailParams,
  UpdateInmailParams,
  inmailIdSchema,
  insertInmailParams,
  updateInmailParams,
} from "@/lib/db/schema/inmails";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateInmails = () => revalidatePath("/inmails");

export const createInmailAction = async (input: NewInmailParams) => {
  try {
    const payload = insertInmailParams.parse(input);
    await createInmail(payload);
    revalidateInmails();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateInmailAction = async (input: UpdateInmailParams) => {
  try {
    const payload = updateInmailParams.parse(input);
    await updateInmail(payload.id, payload);
    revalidateInmails();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteInmailAction = async (input: InmailId) => {
  try {
    const payload = inmailIdSchema.parse({ id: input });
    await deleteInmail(payload.id);
    revalidateInmails();
  } catch (e) {
    return handleErrors(e);
  }
};
