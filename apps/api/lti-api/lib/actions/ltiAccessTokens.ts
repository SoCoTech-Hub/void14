"use server";

import { revalidatePath } from "next/cache";

import {
  createLtiAccessToken,
  deleteLtiAccessToken,
  updateLtiAccessToken,
} from "../api/ltiAccessTokens/mutations";
import {
  insertLtiAccessTokenParams,
  LtiAccessTokenId,
  ltiAccessTokenIdSchema,
  NewLtiAccessTokenParams,
  UpdateLtiAccessTokenParams,
  updateLtiAccessTokenParams,
} from "../db/schema/ltiAccessTokens";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiAccessTokens = () => revalidatePath("/lti-access-tokens");

export const createLtiAccessTokenAction = async (
  input: NewLtiAccessTokenParams,
) => {
  try {
    const payload = insertLtiAccessTokenParams.parse(input);
    await createLtiAccessToken(payload);
    revalidateLtiAccessTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiAccessTokenAction = async (
  input: UpdateLtiAccessTokenParams,
) => {
  try {
    const payload = updateLtiAccessTokenParams.parse(input);
    await updateLtiAccessToken(payload.id, payload);
    revalidateLtiAccessTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiAccessTokenAction = async (input: LtiAccessTokenId) => {
  try {
    const payload = ltiAccessTokenIdSchema.parse({ id: input });
    await deleteLtiAccessToken(payload.id);
    revalidateLtiAccessTokens();
  } catch (e) {
    return handleErrors(e);
  }
};
