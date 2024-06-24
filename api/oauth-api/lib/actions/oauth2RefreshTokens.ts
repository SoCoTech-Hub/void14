"use server";

import { revalidatePath } from "next/cache";
import {
  createOauth2RefreshToken,
  deleteOauth2RefreshToken,
  updateOauth2RefreshToken,
} from "@/lib/api/oauth2RefreshTokens/mutations";
import {
  Oauth2RefreshTokenId,
  NewOauth2RefreshTokenParams,
  UpdateOauth2RefreshTokenParams,
  oauth2RefreshTokenIdSchema,
  insertOauth2RefreshTokenParams,
  updateOauth2RefreshTokenParams,
} from "@/lib/db/schema/oauth2RefreshTokens";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOauth2RefreshTokens = () => revalidatePath("/oauth2-refresh-tokens");

export const createOauth2RefreshTokenAction = async (input: NewOauth2RefreshTokenParams) => {
  try {
    const payload = insertOauth2RefreshTokenParams.parse(input);
    await createOauth2RefreshToken(payload);
    revalidateOauth2RefreshTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOauth2RefreshTokenAction = async (input: UpdateOauth2RefreshTokenParams) => {
  try {
    const payload = updateOauth2RefreshTokenParams.parse(input);
    await updateOauth2RefreshToken(payload.id, payload);
    revalidateOauth2RefreshTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOauth2RefreshTokenAction = async (input: Oauth2RefreshTokenId) => {
  try {
    const payload = oauth2RefreshTokenIdSchema.parse({ id: input });
    await deleteOauth2RefreshToken(payload.id);
    revalidateOauth2RefreshTokens();
  } catch (e) {
    return handleErrors(e);
  }
};