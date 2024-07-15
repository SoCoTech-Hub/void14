"use server";

import { revalidatePath } from "next/cache";
import {
  createSupportStatus,
  deleteSupportStatus,
  updateSupportStatus,
} from "@/lib/api/supportStatuses/mutations";
import {
  SupportStatusId,
  NewSupportStatusParams,
  UpdateSupportStatusParams,
  supportStatusIdSchema,
  insertSupportStatusParams,
  updateSupportStatusParams,
} from "@/lib/db/schema/supportStatuses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSupportStatuses = () => revalidatePath("/support-statuses");

export const createSupportStatusAction = async (input: NewSupportStatusParams) => {
  try {
    const payload = insertSupportStatusParams.parse(input);
    await createSupportStatus(payload);
    revalidateSupportStatuses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSupportStatusAction = async (input: UpdateSupportStatusParams) => {
  try {
    const payload = updateSupportStatusParams.parse(input);
    await updateSupportStatus(payload.id, payload);
    revalidateSupportStatuses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSupportStatusAction = async (input: SupportStatusId) => {
  try {
    const payload = supportStatusIdSchema.parse({ id: input });
    await deleteSupportStatus(payload.id);
    revalidateSupportStatuses();
  } catch (e) {
    return handleErrors(e);
  }
};
