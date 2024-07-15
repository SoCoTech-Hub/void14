"use server";

import { revalidatePath } from "next/cache";
import {
  createOauth2SystemAccount,
  deleteOauth2SystemAccount,
  updateOauth2SystemAccount,
} from "@/lib/api/oauth2SystemAccounts/mutations";
import {
  Oauth2SystemAccountId,
  NewOauth2SystemAccountParams,
  UpdateOauth2SystemAccountParams,
  oauth2SystemAccountIdSchema,
  insertOauth2SystemAccountParams,
  updateOauth2SystemAccountParams,
} from "@/lib/db/schema/oauth2SystemAccounts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOauth2SystemAccounts = () => revalidatePath("/oauth2-system-accounts");

export const createOauth2SystemAccountAction = async (input: NewOauth2SystemAccountParams) => {
  try {
    const payload = insertOauth2SystemAccountParams.parse(input);
    await createOauth2SystemAccount(payload);
    revalidateOauth2SystemAccounts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOauth2SystemAccountAction = async (input: UpdateOauth2SystemAccountParams) => {
  try {
    const payload = updateOauth2SystemAccountParams.parse(input);
    await updateOauth2SystemAccount(payload.id, payload);
    revalidateOauth2SystemAccounts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOauth2SystemAccountAction = async (input: Oauth2SystemAccountId) => {
  try {
    const payload = oauth2SystemAccountIdSchema.parse({ id: input });
    await deleteOauth2SystemAccount(payload.id);
    revalidateOauth2SystemAccounts();
  } catch (e) {
    return handleErrors(e);
  }
};
