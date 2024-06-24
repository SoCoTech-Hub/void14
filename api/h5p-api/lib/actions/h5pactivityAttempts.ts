"use server";

import { revalidatePath } from "next/cache";
import {
  createH5pactivityAttempt,
  deleteH5pactivityAttempt,
  updateH5pactivityAttempt,
} from "@/lib/api/h5pactivityAttempts/mutations";
import {
  H5pactivityAttemptId,
  NewH5pactivityAttemptParams,
  UpdateH5pactivityAttemptParams,
  h5pactivityAttemptIdSchema,
  insertH5pactivityAttemptParams,
  updateH5pactivityAttemptParams,
} from "@/lib/db/schema/h5pactivityAttempts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pactivityAttempts = () => revalidatePath("/h5pactivity-attempts");

export const createH5pactivityAttemptAction = async (input: NewH5pactivityAttemptParams) => {
  try {
    const payload = insertH5pactivityAttemptParams.parse(input);
    await createH5pactivityAttempt(payload);
    revalidateH5pactivityAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pactivityAttemptAction = async (input: UpdateH5pactivityAttemptParams) => {
  try {
    const payload = updateH5pactivityAttemptParams.parse(input);
    await updateH5pactivityAttempt(payload.id, payload);
    revalidateH5pactivityAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pactivityAttemptAction = async (input: H5pactivityAttemptId) => {
  try {
    const payload = h5pactivityAttemptIdSchema.parse({ id: input });
    await deleteH5pactivityAttempt(payload.id);
    revalidateH5pactivityAttempts();
  } catch (e) {
    return handleErrors(e);
  }
};