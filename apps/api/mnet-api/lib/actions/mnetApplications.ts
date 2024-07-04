"use server";

import { revalidatePath } from "next/cache";

import {
  createMnetApplication,
  deleteMnetApplication,
  updateMnetApplication,
} from "../api/mnetApplications/mutations";
import {
  insertMnetApplicationParams,
  MnetApplicationId,
  mnetApplicationIdSchema,
  NewMnetApplicationParams,
  UpdateMnetApplicationParams,
  updateMnetApplicationParams,
} from "../db/schema/mnetApplications";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetApplications = () => revalidatePath("/mnet-applications");

export const createMnetApplicationAction = async (
  input: NewMnetApplicationParams,
) => {
  try {
    const payload = insertMnetApplicationParams.parse(input);
    await createMnetApplication(payload);
    revalidateMnetApplications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetApplicationAction = async (
  input: UpdateMnetApplicationParams,
) => {
  try {
    const payload = updateMnetApplicationParams.parse(input);
    await updateMnetApplication(payload.id, payload);
    revalidateMnetApplications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetApplicationAction = async (input: MnetApplicationId) => {
  try {
    const payload = mnetApplicationIdSchema.parse({ id: input });
    await deleteMnetApplication(payload.id);
    revalidateMnetApplications();
  } catch (e) {
    return handleErrors(e);
  }
};
