"use server";

import { revalidatePath } from "next/cache";

import {
  createGradingformGuideFilling,
  deleteGradingformGuideFilling,
  updateGradingformGuideFilling,
} from "../api/gradingformGuideFillings/mutations";
import {
  GradingformGuideFillingId,
  gradingformGuideFillingIdSchema,
  insertGradingformGuideFillingParams,
  NewGradingformGuideFillingParams,
  UpdateGradingformGuideFillingParams,
  updateGradingformGuideFillingParams,
} from "../db/schema/gradingformGuideFillings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingformGuideFillings = () =>
  revalidatePath("/gradingform-guide-fillings");

export const createGradingformGuideFillingAction = async (
  input: NewGradingformGuideFillingParams,
) => {
  try {
    const payload = insertGradingformGuideFillingParams.parse(input);
    await createGradingformGuideFilling(payload);
    revalidateGradingformGuideFillings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingformGuideFillingAction = async (
  input: UpdateGradingformGuideFillingParams,
) => {
  try {
    const payload = updateGradingformGuideFillingParams.parse(input);
    await updateGradingformGuideFilling(payload.id, payload);
    revalidateGradingformGuideFillings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingformGuideFillingAction = async (
  input: GradingformGuideFillingId,
) => {
  try {
    const payload = gradingformGuideFillingIdSchema.parse({ id: input });
    await deleteGradingformGuideFilling(payload.id);
    revalidateGradingformGuideFillings();
  } catch (e) {
    return handleErrors(e);
  }
};
