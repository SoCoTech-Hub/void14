"use server";

import { revalidatePath } from "next/cache";
import {
  createGradingformRubricFilling,
  deleteGradingformRubricFilling,
  updateGradingformRubricFilling,
} from "@/lib/api/gradingformRubricFillings/mutations";
import {
  GradingformRubricFillingId,
  NewGradingformRubricFillingParams,
  UpdateGradingformRubricFillingParams,
  gradingformRubricFillingIdSchema,
  insertGradingformRubricFillingParams,
  updateGradingformRubricFillingParams,
} from "@/lib/db/schema/gradingformRubricFillings";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingformRubricFillings = () => revalidatePath("/gradingform-rubric-fillings");

export const createGradingformRubricFillingAction = async (input: NewGradingformRubricFillingParams) => {
  try {
    const payload = insertGradingformRubricFillingParams.parse(input);
    await createGradingformRubricFilling(payload);
    revalidateGradingformRubricFillings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingformRubricFillingAction = async (input: UpdateGradingformRubricFillingParams) => {
  try {
    const payload = updateGradingformRubricFillingParams.parse(input);
    await updateGradingformRubricFilling(payload.id, payload);
    revalidateGradingformRubricFillings();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingformRubricFillingAction = async (input: GradingformRubricFillingId) => {
  try {
    const payload = gradingformRubricFillingIdSchema.parse({ id: input });
    await deleteGradingformRubricFilling(payload.id);
    revalidateGradingformRubricFillings();
  } catch (e) {
    return handleErrors(e);
  }
};
