"use server";

import { revalidatePath } from "next/cache";

import {
  createGradeOutcome,
  deleteGradeOutcome,
  updateGradeOutcome,
} from "../api/gradeOutcomes/mutations";
import {
  GradeOutcomeId,
  gradeOutcomeIdSchema,
  insertGradeOutcomeParams,
  NewGradeOutcomeParams,
  UpdateGradeOutcomeParams,
  updateGradeOutcomeParams,
} from "../db/schema/gradeOutcomes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeOutcomes = () => revalidatePath("/grade-outcomes");

export const createGradeOutcomeAction = async (
  input: NewGradeOutcomeParams,
) => {
  try {
    const payload = insertGradeOutcomeParams.parse(input);
    await createGradeOutcome(payload);
    revalidateGradeOutcomes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeOutcomeAction = async (
  input: UpdateGradeOutcomeParams,
) => {
  try {
    const payload = updateGradeOutcomeParams.parse(input);
    await updateGradeOutcome(payload.id, payload);
    revalidateGradeOutcomes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeOutcomeAction = async (input: GradeOutcomeId) => {
  try {
    const payload = gradeOutcomeIdSchema.parse({ id: input });
    await deleteGradeOutcome(payload.id);
    revalidateGradeOutcomes();
  } catch (e) {
    return handleErrors(e);
  }
};
