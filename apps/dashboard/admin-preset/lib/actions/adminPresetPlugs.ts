"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminPresetPlug,
  deleteAdminPresetPlug,
  updateAdminPresetPlug,
} from "@/lib/api/adminPresetPlugs/mutations";
import {
  AdminPresetPlugId,
  NewAdminPresetPlugParams,
  UpdateAdminPresetPlugParams,
  adminPresetPlugIdSchema,
  insertAdminPresetPlugParams,
  updateAdminPresetPlugParams,
} from "@/lib/db/schema/adminPresetPlugs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminPresetPlugs = () => revalidatePath("/admin-preset-plugs");

export const createAdminPresetPlugAction = async (input: NewAdminPresetPlugParams) => {
  try {
    const payload = insertAdminPresetPlugParams.parse(input);
    await createAdminPresetPlug(payload);
    revalidateAdminPresetPlugs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminPresetPlugAction = async (input: UpdateAdminPresetPlugParams) => {
  try {
    const payload = updateAdminPresetPlugParams.parse(input);
    await updateAdminPresetPlug(payload.id, payload);
    revalidateAdminPresetPlugs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminPresetPlugAction = async (input: AdminPresetPlugId) => {
  try {
    const payload = adminPresetPlugIdSchema.parse({ id: input });
    await deleteAdminPresetPlug(payload.id);
    revalidateAdminPresetPlugs();
  } catch (e) {
    return handleErrors(e);
  }
};
