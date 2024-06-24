"use server";

import { revalidatePath } from "next/cache";
import {
  createAffiliatesTransaction,
  deleteAffiliatesTransaction,
  updateAffiliatesTransaction,
} from "@/lib/api/affiliatesTransactions/mutations";
import {
  AffiliatesTransactionId,
  NewAffiliatesTransactionParams,
  UpdateAffiliatesTransactionParams,
  affiliatesTransactionIdSchema,
  insertAffiliatesTransactionParams,
  updateAffiliatesTransactionParams,
} from "@/lib/db/schema/affiliatesTransactions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAffiliatesTransactions = () => revalidatePath("/affiliates-transactions");

export const createAffiliatesTransactionAction = async (input: NewAffiliatesTransactionParams) => {
  try {
    const payload = insertAffiliatesTransactionParams.parse(input);
    await createAffiliatesTransaction(payload);
    revalidateAffiliatesTransactions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAffiliatesTransactionAction = async (input: UpdateAffiliatesTransactionParams) => {
  try {
    const payload = updateAffiliatesTransactionParams.parse(input);
    await updateAffiliatesTransaction(payload.id, payload);
    revalidateAffiliatesTransactions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAffiliatesTransactionAction = async (input: AffiliatesTransactionId) => {
  try {
    const payload = affiliatesTransactionIdSchema.parse({ id: input });
    await deleteAffiliatesTransaction(payload.id);
    revalidateAffiliatesTransactions();
  } catch (e) {
    return handleErrors(e);
  }
};