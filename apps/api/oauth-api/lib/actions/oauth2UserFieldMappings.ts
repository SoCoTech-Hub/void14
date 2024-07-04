"use server";

import { revalidatePath } from "next/cache";

import {
  createOauth2UserFieldMapping,
  deleteOauth2UserFieldMapping,
  updateOauth2UserFieldMapping,
} from "../api/oauth2UserFieldMappings/mutations";
import {
  insertOauth2UserFieldMappingParams,
  NewOauth2UserFieldMappingParams,
  Oauth2UserFieldMappingId,
  oauth2UserFieldMappingIdSchema,
  UpdateOauth2UserFieldMappingParams,
  updateOauth2UserFieldMappingParams,
} from "../db/schema/oauth2UserFieldMappings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOauth2UserFieldMappings = () =>
  revalidatePath("/oauth2-user-field-mappings");

export const createOauth2UserFieldMappingAction = async (
  input: NewOauth2UserFieldMappingParams,
) => {
  try {
    const payload = insertOauth2UserFieldMappingParams.parse(input);
    await createOauth2UserFieldMapping(payload);
    revalidateOauth2UserFieldMappings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOauth2UserFieldMappingAction = async (
  input: UpdateOauth2UserFieldMappingParams,
) => {
  try {
    const payload = updateOauth2UserFieldMappingParams.parse(input);
    await updateOauth2UserFieldMapping(payload.id, payload);
    revalidateOauth2UserFieldMappings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOauth2UserFieldMappingAction = async (
  input: Oauth2UserFieldMappingId,
) => {
  try {
    const payload = oauth2UserFieldMappingIdSchema.parse({ id: input });
    await deleteOauth2UserFieldMapping(payload.id);
    revalidateOauth2UserFieldMappings();
  } catch (e) {
    return handleErrors(e);
  }
};
