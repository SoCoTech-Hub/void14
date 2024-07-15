"use server";

import { revalidatePath } from "next/cache";
import {
  createBigBlueButtonBnLog,
  deleteBigBlueButtonBnLog,
  updateBigBlueButtonBnLog,
} from "@/lib/api/bigBlueButtonBnLogs/mutations";
import {
  BigBlueButtonBnLogId,
  NewBigBlueButtonBnLogParams,
  UpdateBigBlueButtonBnLogParams,
  bigBlueButtonBnLogIdSchema,
  insertBigBlueButtonBnLogParams,
  updateBigBlueButtonBnLogParams,
} from "@/lib/db/schema/bigBlueButtonBnLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBigBlueButtonBnLogs = () => revalidatePath("/big-blue-button-bn-logs");

export const createBigBlueButtonBnLogAction = async (input: NewBigBlueButtonBnLogParams) => {
  try {
    const payload = insertBigBlueButtonBnLogParams.parse(input);
    await createBigBlueButtonBnLog(payload);
    revalidateBigBlueButtonBnLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBigBlueButtonBnLogAction = async (input: UpdateBigBlueButtonBnLogParams) => {
  try {
    const payload = updateBigBlueButtonBnLogParams.parse(input);
    await updateBigBlueButtonBnLog(payload.id, payload);
    revalidateBigBlueButtonBnLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBigBlueButtonBnLogAction = async (input: BigBlueButtonBnLogId) => {
  try {
    const payload = bigBlueButtonBnLogIdSchema.parse({ id: input });
    await deleteBigBlueButtonBnLog(payload.id);
    revalidateBigBlueButtonBnLogs();
  } catch (e) {
    return handleErrors(e);
  }
};
