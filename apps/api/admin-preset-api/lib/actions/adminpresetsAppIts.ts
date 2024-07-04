"use server";

import { revalidatePath } from "next/cache";

import {
  createAdminpresetsAppIt,
  deleteAdminpresetsAppIt,
  updateAdminpresetsAppIt,
} from "../api/adminpresetsAppIts/mutations";
import {
  AdminpresetsAppItId,
  adminpresetsAppItIdSchema,
  insertAdminpresetsAppItParams,
  NewAdminpresetsAppItParams,
  UpdateAdminpresetsAppItParams,
  updateAdminpresetsAppItParams,
} from "../db/schema/adminpresetsAppIts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAdminpresetsAppIts = () =>
  revalidatePath("/adminpresets-app-its");

export const createAdminpresetsAppItAction = async (
  input: NewAdminpresetsAppItParams,
) => {
  try {
    const payload = insertAdminpresetsAppItParams.parse(input);
    await createAdminpresetsAppIt(payload);
    revalidateAdminpresetsAppIts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAdminpresetsAppItAction = async (
  input: UpdateAdminpresetsAppItParams,
) => {
  try {
    const payload = updateAdminpresetsAppItParams.parse(input);
    await updateAdminpresetsAppIt(payload.id, payload);
    revalidateAdminpresetsAppIts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAdminpresetsAppItAction = async (
  input: AdminpresetsAppItId,
) => {
  try {
    const payload = adminpresetsAppItIdSchema.parse({ id: input });
    await deleteAdminpresetsAppIt(payload.id);
    revalidateAdminpresetsAppIts();
  } catch (e) {
    return handleErrors(e);
  }
};
