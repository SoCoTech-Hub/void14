"use server";

import { revalidatePath } from "next/cache";

import {
  createAdminPresetIt,
  deleteAdminPresetIt,
  updateAdminPresetIt,
} from "../api/adminPresetIts/mutations";
import {
  AdminPresetItId,
  adminPresetItIdSchema,
  insertAdminPresetItParams,
  NewAdminPresetItParams,
  UpdateAdminPresetItParams,
  updateAdminPresetItParams,
} from "../db/schema/adminPresetIts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminPresetIts = () => revalidatePath("/admin-preset-its");

export const createAdminPresetItAction = async (
  input: NewAdminPresetItParams,
) => {
  try {
    const payload = insertAdminPresetItParams.parse(input);
    await createAdminPresetIt(payload);
    revalidateAdminPresetIts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminPresetItAction = async (
  input: UpdateAdminPresetItParams,
) => {
  try {
    const payload = updateAdminPresetItParams.parse(input);
    await updateAdminPresetIt(payload.id, payload);
    revalidateAdminPresetIts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminPresetItAction = async (input: AdminPresetItId) => {
  try {
    const payload = adminPresetItIdSchema.parse({ id: input });
    await deleteAdminPresetIt(payload.id);
    revalidateAdminPresetIts();
  } catch (e) {
    return handleErrors(e);
  }
};
