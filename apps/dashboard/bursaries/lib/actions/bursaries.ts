"use server";

import { revalidatePath } from "next/cache";
import {
  createBursary,
  deleteBursary,
  updateBursary,
} from "@/lib/api/bursaries/mutations";
import {
  BursaryId,
  NewBursaryParams,
  UpdateBursaryParams,
  bursaryIdSchema,
  insertBursaryParams,
  updateBursaryParams,
} from "@/lib/db/schema/bursaries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBursaries = () => revalidatePath("/bursaries");

export const createBursaryAction = async (input: NewBursaryParams) => {
  try {
    const payload = insertBursaryParams.parse(input);
    await createBursary(payload);
    revalidateBursaries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBursaryAction = async (input: UpdateBursaryParams) => {
  try {
    const payload = updateBursaryParams.parse(input);
    await updateBursary(payload.id, payload);
    revalidateBursaries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBursaryAction = async (input: BursaryId) => {
  try {
    const payload = bursaryIdSchema.parse({ id: input });
    await deleteBursary(payload.id);
    revalidateBursaries();
  } catch (e) {
    return handleErrors(e);
  }
};
