"use server";

import { revalidatePath } from "next/cache";
import {
  createOauth2AccessToken,
  deleteOauth2AccessToken,
  updateOauth2AccessToken,
} from "@/lib/api/oauth2AccessTokens/mutations";
import {
  Oauth2AccessTokenId,
  NewOauth2AccessTokenParams,
  UpdateOauth2AccessTokenParams,
  oauth2AccessTokenIdSchema,
  insertOauth2AccessTokenParams,
  updateOauth2AccessTokenParams,
} from "@/lib/db/schema/oauth2AccessTokens";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOauth2AccessTokens = () => revalidatePath("/oauth2-access-tokens");

export const createOauth2AccessTokenAction = async (input: NewOauth2AccessTokenParams) => {
  try {
    const payload = insertOauth2AccessTokenParams.parse(input);
    await createOauth2AccessToken(payload);
    revalidateOauth2AccessTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOauth2AccessTokenAction = async (input: UpdateOauth2AccessTokenParams) => {
  try {
    const payload = updateOauth2AccessTokenParams.parse(input);
    await updateOauth2AccessToken(payload.id, payload);
    revalidateOauth2AccessTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOauth2AccessTokenAction = async (input: Oauth2AccessTokenId) => {
  try {
    const payload = oauth2AccessTokenIdSchema.parse({ id: input });
    await deleteOauth2AccessToken(payload.id);
    revalidateOauth2AccessTokens();
  } catch (e) {
    return handleErrors(e);
  }
};