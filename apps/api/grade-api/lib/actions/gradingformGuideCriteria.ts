"use server";

import { revalidatePath } from "next/cache";

import {
  createGradingformGuideCriterion,
  deleteGradingformGuideCriterion,
  updateGradingformGuideCriterion,
} from "../api/gradingformGuideCriteria/mutations";
import {
  GradingformGuideCriterionId,
  gradingformGuideCriterionIdSchema,
  insertGradingformGuideCriterionParams,
  NewGradingformGuideCriterionParams,
  UpdateGradingformGuideCriterionParams,
  updateGradingformGuideCriterionParams,
} from "../db/schema/gradingformGuideCriteria";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingformGuideCriteria = () =>
  revalidatePath("/gradingform-guide-criteria");

export const createGradingformGuideCriterionAction = async (
  input: NewGradingformGuideCriterionParams,
) => {
  try {
    const payload = insertGradingformGuideCriterionParams.parse(input);
    await createGradingformGuideCriterion(payload);
    revalidateGradingformGuideCriteria();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingformGuideCriterionAction = async (
  input: UpdateGradingformGuideCriterionParams,
) => {
  try {
    const payload = updateGradingformGuideCriterionParams.parse(input);
    await updateGradingformGuideCriterion(payload.id, payload);
    revalidateGradingformGuideCriteria();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingformGuideCriterionAction = async (
  input: GradingformGuideCriterionId,
) => {
  try {
    const payload = gradingformGuideCriterionIdSchema.parse({ id: input });
    await deleteGradingformGuideCriterion(payload.id);
    revalidateGradingformGuideCriteria();
  } catch (e) {
    return handleErrors(e);
  }
};
