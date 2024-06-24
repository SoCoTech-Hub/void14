"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminPresetAppPlug,
  deleteAdminPresetAppPlug,
  updateAdminPresetAppPlug,
} from "@/lib/api/adminPresetAppPlugs/mutations";
import {
  AdminPresetAppPlugId,
  NewAdminPresetAppPlugParams,
  UpdateAdminPresetAppPlugParams,
  adminPresetAppPlugIdSchema,
  insertAdminPresetAppPlugParams,
  updateAdminPresetAppPlugParams,
} from "@/lib/db/schema/adminPresetAppPlugs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminPresetAppPlugs = () => revalidatePath("/admin-preset-app-plugs");

export const createAdminPresetAppPlugAction = async (input: NewAdminPresetAppPlugParams) => {
  try {
    const payload = insertAdminPresetAppPlugParams.parse(input);
    await createAdminPresetAppPlug(payload);
    revalidateAdminPresetAppPlugs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminPresetAppPlugAction = async (input: UpdateAdminPresetAppPlugParams) => {
  try {
    const payload = updateAdminPresetAppPlugParams.parse(input);
    await updateAdminPresetAppPlug(payload.id, payload);
    revalidateAdminPresetAppPlugs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminPresetAppPlugAction = async (input: AdminPresetAppPlugId) => {
  try {
    const payload = adminPresetAppPlugIdSchema.parse({ id: input });
    await deleteAdminPresetAppPlug(payload.id);
    revalidateAdminPresetAppPlugs();
  } catch (e) {
    return handleErrors(e);
  }
};