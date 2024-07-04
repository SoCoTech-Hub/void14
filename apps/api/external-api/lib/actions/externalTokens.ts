"use server";

import { revalidatePath } from "next/cache";

import {
  createExternalToken,
  deleteExternalToken,
  updateExternalToken,
} from "../api/externalTokens/mutations";
import {
  ExternalTokenId,
  externalTokenIdSchema,
  insertExternalTokenParams,
  NewExternalTokenParams,
  UpdateExternalTokenParams,
  updateExternalTokenParams,
} from "../db/schema/externalTokens";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateExternalTokens = () => revalidatePath("/external-tokens");

export const createExternalTokenAction = async (
  input: NewExternalTokenParams,
) => {
  try {
    const payload = insertExternalTokenParams.parse(input);
    await createExternalToken(payload);
    revalidateExternalTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateExternalTokenAction = async (
  input: UpdateExternalTokenParams,
) => {
  try {
    const payload = updateExternalTokenParams.parse(input);
    await updateExternalToken(payload.id, payload);
    revalidateExternalTokens();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteExternalTokenAction = async (input: ExternalTokenId) => {
  try {
    const payload = externalTokenIdSchema.parse({ id: input });
    await deleteExternalToken(payload.id);
    revalidateExternalTokens();
  } catch (e) {
    return handleErrors(e);
  }
};
