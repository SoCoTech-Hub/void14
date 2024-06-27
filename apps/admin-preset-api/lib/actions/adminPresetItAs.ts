"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminPresetItA,
  deleteAdminPresetItA,
  updateAdminPresetItA,
} from "@/lib/api/adminPresetItAs/mutations";
import {
  AdminPresetItAId,
  NewAdminPresetItAParams,
  UpdateAdminPresetItAParams,
  adminPresetItAIdSchema,
  insertAdminPresetItAParams,
  updateAdminPresetItAParams,
} from "@/lib/db/schema/adminPresetItAs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminPresetItAs = () => revalidatePath("/admin-preset-it-as");

export const createAdminPresetItAAction = async (input: NewAdminPresetItAParams) => {
  try {
    const payload = insertAdminPresetItAParams.parse(input);
    await createAdminPresetItA(payload);
    revalidateAdminPresetItAs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminPresetItAAction = async (input: UpdateAdminPresetItAParams) => {
  try {
    const payload = updateAdminPresetItAParams.parse(input);
    await updateAdminPresetItA(payload.id, payload);
    revalidateAdminPresetItAs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminPresetItAAction = async (input: AdminPresetItAId) => {
  try {
    const payload = adminPresetItAIdSchema.parse({ id: input });
    await deleteAdminPresetItA(payload.id);
    revalidateAdminPresetItAs();
  } catch (e) {
    return handleErrors(e);
  }
};