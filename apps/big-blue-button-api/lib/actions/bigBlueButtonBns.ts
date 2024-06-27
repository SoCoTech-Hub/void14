"use server";

import { revalidatePath } from "next/cache";
import {
  createBigBlueButtonBn,
  deleteBigBlueButtonBn,
  updateBigBlueButtonBn,
} from "@/lib/api/bigBlueButtonBns/mutations";
import {
  BigBlueButtonBnId,
  NewBigBlueButtonBnParams,
  UpdateBigBlueButtonBnParams,
  bigBlueButtonBnIdSchema,
  insertBigBlueButtonBnParams,
  updateBigBlueButtonBnParams,
} from "@/lib/db/schema/bigBlueButtonBns";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBigBlueButtonBns = () => revalidatePath("/big-blue-button-bns");

export const createBigBlueButtonBnAction = async (input: NewBigBlueButtonBnParams) => {
  try {
    const payload = insertBigBlueButtonBnParams.parse(input);
    await createBigBlueButtonBn(payload);
    revalidateBigBlueButtonBns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBigBlueButtonBnAction = async (input: UpdateBigBlueButtonBnParams) => {
  try {
    const payload = updateBigBlueButtonBnParams.parse(input);
    await updateBigBlueButtonBn(payload.id, payload);
    revalidateBigBlueButtonBns();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBigBlueButtonBnAction = async (input: BigBlueButtonBnId) => {
  try {
    const payload = bigBlueButtonBnIdSchema.parse({ id: input });
    await deleteBigBlueButtonBn(payload.id);
    revalidateBigBlueButtonBns();
  } catch (e) {
    return handleErrors(e);
  }
};