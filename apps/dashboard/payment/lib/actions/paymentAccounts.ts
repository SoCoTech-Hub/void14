"use server";

import { revalidatePath } from "next/cache";
import {
  createPaymentAccount,
  deletePaymentAccount,
  updatePaymentAccount,
} from "@/lib/api/paymentAccounts/mutations";
import {
  PaymentAccountId,
  NewPaymentAccountParams,
  UpdatePaymentAccountParams,
  paymentAccountIdSchema,
  insertPaymentAccountParams,
  updatePaymentAccountParams,
} from "@/lib/db/schema/paymentAccounts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidatePaymentAccounts = () => revalidatePath("/payment-accounts");

export const createPaymentAccountAction = async (input: NewPaymentAccountParams) => {
  try {
    const payload = insertPaymentAccountParams.parse(input);
    await createPaymentAccount(payload);
    revalidatePaymentAccounts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updatePaymentAccountAction = async (input: UpdatePaymentAccountParams) => {
  try {
    const payload = updatePaymentAccountParams.parse(input);
    await updatePaymentAccount(payload.id, payload);
    revalidatePaymentAccounts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deletePaymentAccountAction = async (input: PaymentAccountId) => {
  try {
    const payload = paymentAccountIdSchema.parse({ id: input });
    await deletePaymentAccount(payload.id);
    revalidatePaymentAccounts();
  } catch (e) {
    return handleErrors(e);
  }
};
