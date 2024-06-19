"use server";

import { revalidatePath } from "next/cache";
import {
  createLtiToolSetting,
  deleteLtiToolSetting,
  updateLtiToolSetting,
} from "@/lib/api/ltiToolSettings/mutations";
import {
  LtiToolSettingId,
  NewLtiToolSettingParams,
  UpdateLtiToolSettingParams,
  ltiToolSettingIdSchema,
  insertLtiToolSettingParams,
  updateLtiToolSettingParams,
} from "@/lib/db/schema/ltiToolSettings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiToolSettings = () => revalidatePath("/lti-tool-settings");

export const createLtiToolSettingAction = async (input: NewLtiToolSettingParams) => {
  try {
    const payload = insertLtiToolSettingParams.parse(input);
    await createLtiToolSetting(payload);
    revalidateLtiToolSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiToolSettingAction = async (input: UpdateLtiToolSettingParams) => {
  try {
    const payload = updateLtiToolSettingParams.parse(input);
    await updateLtiToolSetting(payload.id, payload);
    revalidateLtiToolSettings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiToolSettingAction = async (input: LtiToolSettingId) => {
  try {
    const payload = ltiToolSettingIdSchema.parse({ id: input });
    await deleteLtiToolSetting(payload.id);
    revalidateLtiToolSettings();
  } catch (e) {
    return handleErrors(e);
  }
};