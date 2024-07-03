"use server";

import { revalidatePath } from "next/cache";
import {
  createH5pactivityAttemptsResult,
  deleteH5pactivityAttemptsResult,
  updateH5pactivityAttemptsResult,
} from "@/lib/api/h5pactivityAttemptsResults/mutations";
import {
  H5pactivityAttemptsResultId,
  NewH5pactivityAttemptsResultParams,
  UpdateH5pactivityAttemptsResultParams,
  h5pactivityAttemptsResultIdSchema,
  insertH5pactivityAttemptsResultParams,
  updateH5pactivityAttemptsResultParams,
} from "@/lib/db/schema/h5pactivityAttemptsResults";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pactivityAttemptsResults = () => revalidatePath("/h5pactivity-attempts-results");

export const createH5pactivityAttemptsResultAction = async (input: NewH5pactivityAttemptsResultParams) => {
  try {
    const payload = insertH5pactivityAttemptsResultParams.parse(input);
    await createH5pactivityAttemptsResult(payload);
    revalidateH5pactivityAttemptsResults();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pactivityAttemptsResultAction = async (input: UpdateH5pactivityAttemptsResultParams) => {
  try {
    const payload = updateH5pactivityAttemptsResultParams.parse(input);
    await updateH5pactivityAttemptsResult(payload.id, payload);
    revalidateH5pactivityAttemptsResults();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pactivityAttemptsResultAction = async (input: H5pactivityAttemptsResultId) => {
  try {
    const payload = h5pactivityAttemptsResultIdSchema.parse({ id: input });
    await deleteH5pactivityAttemptsResult(payload.id);
    revalidateH5pactivityAttemptsResults();
  } catch (e) {
    return handleErrors(e);
  }
};