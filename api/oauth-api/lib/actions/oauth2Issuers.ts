"use server";

import { revalidatePath } from "next/cache";
import {
  createOauth2Issuer,
  deleteOauth2Issuer,
  updateOauth2Issuer,
} from "@/lib/api/oauth2Issuers/mutations";
import {
  Oauth2IssuerId,
  NewOauth2IssuerParams,
  UpdateOauth2IssuerParams,
  oauth2IssuerIdSchema,
  insertOauth2IssuerParams,
  updateOauth2IssuerParams,
} from "@/lib/db/schema/oauth2Issuers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOauth2Issuers = () => revalidatePath("/oauth2-issuers");

export const createOauth2IssuerAction = async (input: NewOauth2IssuerParams) => {
  try {
    const payload = insertOauth2IssuerParams.parse(input);
    await createOauth2Issuer(payload);
    revalidateOauth2Issuers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOauth2IssuerAction = async (input: UpdateOauth2IssuerParams) => {
  try {
    const payload = updateOauth2IssuerParams.parse(input);
    await updateOauth2Issuer(payload.id, payload);
    revalidateOauth2Issuers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOauth2IssuerAction = async (input: Oauth2IssuerId) => {
  try {
    const payload = oauth2IssuerIdSchema.parse({ id: input });
    await deleteOauth2Issuer(payload.id);
    revalidateOauth2Issuers();
  } catch (e) {
    return handleErrors(e);
  }
};