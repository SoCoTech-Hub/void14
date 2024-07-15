"use server";

import { revalidatePath } from "next/cache";
import {
  createAdminpresetsAppItA,
  deleteAdminpresetsAppItA,
  updateAdminpresetsAppItA,
} from "@/lib/api/adminpresetsAppItAs/mutations";
import {
  AdminpresetsAppItAId,
  NewAdminpresetsAppItAParams,
  UpdateAdminpresetsAppItAParams,
  adminpresetsAppItAIdSchema,
  insertAdminpresetsAppItAParams,
  updateAdminpresetsAppItAParams,
} from "@/lib/db/schema/adminpresetsAppItAs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminpresetsAppItAs = () => revalidatePath("/adminpresets-app-it-as");

export const createAdminpresetsAppItAAction = async (input: NewAdminpresetsAppItAParams) => {
  try {
    const payload = insertAdminpresetsAppItAParams.parse(input);
    await createAdminpresetsAppItA(payload);
    revalidateAdminpresetsAppItAs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminpresetsAppItAAction = async (input: UpdateAdminpresetsAppItAParams) => {
  try {
    const payload = updateAdminpresetsAppItAParams.parse(input);
    await updateAdminpresetsAppItA(payload.id, payload);
    revalidateAdminpresetsAppItAs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminpresetsAppItAAction = async (input: AdminpresetsAppItAId) => {
  try {
    const payload = adminpresetsAppItAIdSchema.parse({ id: input });
    await deleteAdminpresetsAppItA(payload.id);
    revalidateAdminpresetsAppItAs();
  } catch (e) {
    return handleErrors(e);
  }
};
