"use server";

import { revalidatePath } from "next/cache";

import {
  createSupportDepartment,
  deleteSupportDepartment,
  updateSupportDepartment,
} from "../api/supportDepartments/mutations";
import {
  insertSupportDepartmentParams,
  NewSupportDepartmentParams,
  SupportDepartmentId,
  supportDepartmentIdSchema,
  UpdateSupportDepartmentParams,
  updateSupportDepartmentParams,
} from "../db/schema/supportDepartments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSupportDepartments = () =>
  revalidatePath("/support-departments");

export const createSupportDepartmentAction = async (
  input: NewSupportDepartmentParams,
) => {
  try {
    const payload = insertSupportDepartmentParams.parse(input);
    await createSupportDepartment(payload);
    revalidateSupportDepartments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSupportDepartmentAction = async (
  input: UpdateSupportDepartmentParams,
) => {
  try {
    const payload = updateSupportDepartmentParams.parse(input);
    await updateSupportDepartment(payload.id, payload);
    revalidateSupportDepartments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSupportDepartmentAction = async (
  input: SupportDepartmentId,
) => {
  try {
    const payload = supportDepartmentIdSchema.parse({ id: input });
    await deleteSupportDepartment(payload.id);
    revalidateSupportDepartments();
  } catch (e) {
    return handleErrors(e);
  }
};
