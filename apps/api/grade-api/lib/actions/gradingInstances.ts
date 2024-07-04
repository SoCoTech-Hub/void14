"use server";

import { revalidatePath } from "next/cache";

import {
  createGradingInstance,
  deleteGradingInstance,
  updateGradingInstance,
} from "../api/gradingInstances/mutations";
import {
  GradingInstanceId,
  gradingInstanceIdSchema,
  insertGradingInstanceParams,
  NewGradingInstanceParams,
  UpdateGradingInstanceParams,
  updateGradingInstanceParams,
} from "../db/schema/gradingInstances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingInstances = () => revalidatePath("/grading-instances");

export const createGradingInstanceAction = async (
  input: NewGradingInstanceParams,
) => {
  try {
    const payload = insertGradingInstanceParams.parse(input);
    await createGradingInstance(payload);
    revalidateGradingInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingInstanceAction = async (
  input: UpdateGradingInstanceParams,
) => {
  try {
    const payload = updateGradingInstanceParams.parse(input);
    await updateGradingInstance(payload.id, payload);
    revalidateGradingInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingInstanceAction = async (input: GradingInstanceId) => {
  try {
    const payload = gradingInstanceIdSchema.parse({ id: input });
    await deleteGradingInstance(payload.id);
    revalidateGradingInstances();
  } catch (e) {
    return handleErrors(e);
  }
};
