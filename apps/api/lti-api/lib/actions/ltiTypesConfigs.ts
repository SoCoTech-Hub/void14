"use server";

import { revalidatePath } from "next/cache";

import {
  createLtiTypesConfig,
  deleteLtiTypesConfig,
  updateLtiTypesConfig,
} from "../api/ltiTypesConfigs/mutations";
import {
  insertLtiTypesConfigParams,
  LtiTypesConfigId,
  ltiTypesConfigIdSchema,
  NewLtiTypesConfigParams,
  UpdateLtiTypesConfigParams,
  updateLtiTypesConfigParams,
} from "../db/schema/ltiTypesConfigs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiTypesConfigs = () => revalidatePath("/lti-types-configs");

export const createLtiTypesConfigAction = async (
  input: NewLtiTypesConfigParams,
) => {
  try {
    const payload = insertLtiTypesConfigParams.parse(input);
    await createLtiTypesConfig(payload);
    revalidateLtiTypesConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiTypesConfigAction = async (
  input: UpdateLtiTypesConfigParams,
) => {
  try {
    const payload = updateLtiTypesConfigParams.parse(input);
    await updateLtiTypesConfig(payload.id, payload);
    revalidateLtiTypesConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiTypesConfigAction = async (input: LtiTypesConfigId) => {
  try {
    const payload = ltiTypesConfigIdSchema.parse({ id: input });
    await deleteLtiTypesConfig(payload.id);
    revalidateLtiTypesConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};
