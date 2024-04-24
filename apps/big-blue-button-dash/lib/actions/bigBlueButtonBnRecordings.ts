"use server";

import { revalidatePath } from "next/cache";
import {
  createBigBlueButtonBnRecording,
  deleteBigBlueButtonBnRecording,
  updateBigBlueButtonBnRecording,
} from "@/lib/api/bigBlueButtonBnRecordings/mutations";
import {
  BigBlueButtonBnRecordingId,
  NewBigBlueButtonBnRecordingParams,
  UpdateBigBlueButtonBnRecordingParams,
  bigBlueButtonBnRecordingIdSchema,
  insertBigBlueButtonBnRecordingParams,
  updateBigBlueButtonBnRecordingParams,
} from "@/lib/db/schema/bigBlueButtonBnRecordings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBigBlueButtonBnRecordings = () => revalidatePath("/big-blue-button-bn-recordings");

export const createBigBlueButtonBnRecordingAction = async (input: NewBigBlueButtonBnRecordingParams) => {
  try {
    const payload = insertBigBlueButtonBnRecordingParams.parse(input);
    await createBigBlueButtonBnRecording(payload);
    revalidateBigBlueButtonBnRecordings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBigBlueButtonBnRecordingAction = async (input: UpdateBigBlueButtonBnRecordingParams) => {
  try {
    const payload = updateBigBlueButtonBnRecordingParams.parse(input);
    await updateBigBlueButtonBnRecording(payload.id, payload);
    revalidateBigBlueButtonBnRecordings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBigBlueButtonBnRecordingAction = async (input: BigBlueButtonBnRecordingId) => {
  try {
    const payload = bigBlueButtonBnRecordingIdSchema.parse({ id: input });
    await deleteBigBlueButtonBnRecording(payload.id);
    revalidateBigBlueButtonBnRecordings();
  } catch (e) {
    return handleErrors(e);
  }
};