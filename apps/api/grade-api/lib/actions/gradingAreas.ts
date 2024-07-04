"use server";

import { revalidatePath } from "next/cache";

import {
  createGradingArea,
  deleteGradingArea,
  updateGradingArea,
} from "../api/gradingAreas/mutations";
import {
  GradingAreaId,
  gradingAreaIdSchema,
  insertGradingAreaParams,
  NewGradingAreaParams,
  UpdateGradingAreaParams,
  updateGradingAreaParams,
} from "../db/schema/gradingAreas";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingAreas = () => revalidatePath("/grading-areas");

export const createGradingAreaAction = async (input: NewGradingAreaParams) => {
  try {
    const payload = insertGradingAreaParams.parse(input);
    await createGradingArea(payload);
    revalidateGradingAreas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingAreaAction = async (
  input: UpdateGradingAreaParams,
) => {
  try {
    const payload = updateGradingAreaParams.parse(input);
    await updateGradingArea(payload.id, payload);
    revalidateGradingAreas();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingAreaAction = async (input: GradingAreaId) => {
  try {
    const payload = gradingAreaIdSchema.parse({ id: input });
    await deleteGradingArea(payload.id);
    revalidateGradingAreas();
  } catch (e) {
    return handleErrors(e);
  }
};
