"use server";

import { revalidatePath } from "next/cache";
import {
  createGradingformRubricLevel,
  deleteGradingformRubricLevel,
  updateGradingformRubricLevel,
} from "@/lib/api/gradingformRubricLevels/mutations";
import {
  GradingformRubricLevelId,
  NewGradingformRubricLevelParams,
  UpdateGradingformRubricLevelParams,
  gradingformRubricLevelIdSchema,
  insertGradingformRubricLevelParams,
  updateGradingformRubricLevelParams,
} from "@/lib/db/schema/gradingformRubricLevels";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingformRubricLevels = () => revalidatePath("/gradingform-rubric-levels");

export const createGradingformRubricLevelAction = async (input: NewGradingformRubricLevelParams) => {
  try {
    const payload = insertGradingformRubricLevelParams.parse(input);
    await createGradingformRubricLevel(payload);
    revalidateGradingformRubricLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingformRubricLevelAction = async (input: UpdateGradingformRubricLevelParams) => {
  try {
    const payload = updateGradingformRubricLevelParams.parse(input);
    await updateGradingformRubricLevel(payload.id, payload);
    revalidateGradingformRubricLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingformRubricLevelAction = async (input: GradingformRubricLevelId) => {
  try {
    const payload = gradingformRubricLevelIdSchema.parse({ id: input });
    await deleteGradingformRubricLevel(payload.id);
    revalidateGradingformRubricLevels();
  } catch (e) {
    return handleErrors(e);
  }
};
