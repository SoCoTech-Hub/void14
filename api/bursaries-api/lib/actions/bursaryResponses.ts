"use server";

import { revalidatePath } from "next/cache";
import {
  createBursaryResponse,
  deleteBursaryResponse,
  updateBursaryResponse,
} from "@/lib/api/bursaryResponses/mutations";
import {
  BursaryResponseId,
  NewBursaryResponseParams,
  UpdateBursaryResponseParams,
  bursaryResponseIdSchema,
  insertBursaryResponseParams,
  updateBursaryResponseParams,
} from "@/lib/db/schema/bursaryResponses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateBursaryResponses = () => revalidatePath("/bursary-responses");

export const createBursaryResponseAction = async (input: NewBursaryResponseParams) => {
  try {
    const payload = insertBursaryResponseParams.parse(input);
    await createBursaryResponse(payload);
    revalidateBursaryResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateBursaryResponseAction = async (input: UpdateBursaryResponseParams) => {
  try {
    const payload = updateBursaryResponseParams.parse(input);
    await updateBursaryResponse(payload.id, payload);
    revalidateBursaryResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteBursaryResponseAction = async (input: BursaryResponseId) => {
  try {
    const payload = bursaryResponseIdSchema.parse({ id: input });
    await deleteBursaryResponse(payload.id);
    revalidateBursaryResponses();
  } catch (e) {
    return handleErrors(e);
  }
};