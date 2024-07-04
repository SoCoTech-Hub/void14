"use server";

import { revalidatePath } from "next/cache";

import {
  createPaygwPaypal,
  deletePaygwPaypal,
  updatePaygwPaypal,
} from "../api/paygwPaypals/mutations";
import {
  insertPaygwPaypalParams,
  NewPaygwPaypalParams,
  PaygwPaypalId,
  paygwPaypalIdSchema,
  UpdatePaygwPaypalParams,
  updatePaygwPaypalParams,
} from "../db/schema/paygwPaypals";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePaygwPaypals = () => revalidatePath("/paygw-paypals");

export const createPaygwPaypalAction = async (input: NewPaygwPaypalParams) => {
  try {
    const payload = insertPaygwPaypalParams.parse(input);
    await createPaygwPaypal(payload);
    revalidatePaygwPaypals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePaygwPaypalAction = async (
  input: UpdatePaygwPaypalParams,
) => {
  try {
    const payload = updatePaygwPaypalParams.parse(input);
    await updatePaygwPaypal(payload.id, payload);
    revalidatePaygwPaypals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePaygwPaypalAction = async (input: PaygwPaypalId) => {
  try {
    const payload = paygwPaypalIdSchema.parse({ id: input });
    await deletePaygwPaypal(payload.id);
    revalidatePaygwPaypals();
  } catch (e) {
    return handleErrors(e);
  }
};
