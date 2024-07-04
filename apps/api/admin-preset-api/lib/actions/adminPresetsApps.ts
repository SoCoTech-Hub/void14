"use server";

import { revalidatePath } from "next/cache";

import {
  createAdminPresetsApp,
  deleteAdminPresetsApp,
  updateAdminPresetsApp,
} from "../api/adminPresetsApps/mutations";
import {
  AdminPresetsAppId,
  adminPresetsAppIdSchema,
  insertAdminPresetsAppParams,
  NewAdminPresetsAppParams,
  UpdateAdminPresetsAppParams,
  updateAdminPresetsAppParams,
} from "../db/schema/adminPresetsApps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminPresetsApps = () => revalidatePath("/admin-presets-apps");

export const createAdminPresetsAppAction = async (
  input: NewAdminPresetsAppParams,
) => {
  try {
    const payload = insertAdminPresetsAppParams.parse(input);
    await createAdminPresetsApp(payload);
    revalidateAdminPresetsApps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminPresetsAppAction = async (
  input: UpdateAdminPresetsAppParams,
) => {
  try {
    const payload = updateAdminPresetsAppParams.parse(input);
    await updateAdminPresetsApp(payload.id, payload);
    revalidateAdminPresetsApps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminPresetsAppAction = async (input: AdminPresetsAppId) => {
  try {
    const payload = adminPresetsAppIdSchema.parse({ id: input });
    await deleteAdminPresetsApp(payload.id);
    revalidateAdminPresetsApps();
  } catch (e) {
    return handleErrors(e);
  }
};
