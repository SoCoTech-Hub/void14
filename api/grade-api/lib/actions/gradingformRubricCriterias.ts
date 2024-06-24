"use server";

import { revalidatePath } from "next/cache";
import {
  createGradingformRubricCriteria,
  deleteGradingformRubricCriteria,
  updateGradingformRubricCriteria,
} from "@/lib/api/gradingformRubricCriterias/mutations";
import {
  GradingformRubricCriteriaId,
  NewGradingformRubricCriteriaParams,
  UpdateGradingformRubricCriteriaParams,
  gradingformRubricCriteriaIdSchema,
  insertGradingformRubricCriteriaParams,
  updateGradingformRubricCriteriaParams,
} from "@/lib/db/schema/gradingformRubricCriterias";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradingformRubricCriterias = () => revalidatePath("/gradingform-rubric-criterias");

export const createGradingformRubricCriteriaAction = async (input: NewGradingformRubricCriteriaParams) => {
  try {
    const payload = insertGradingformRubricCriteriaParams.parse(input);
    await createGradingformRubricCriteria(payload);
    revalidateGradingformRubricCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradingformRubricCriteriaAction = async (input: UpdateGradingformRubricCriteriaParams) => {
  try {
    const payload = updateGradingformRubricCriteriaParams.parse(input);
    await updateGradingformRubricCriteria(payload.id, payload);
    revalidateGradingformRubricCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradingformRubricCriteriaAction = async (input: GradingformRubricCriteriaId) => {
  try {
    const payload = gradingformRubricCriteriaIdSchema.parse({ id: input });
    await deleteGradingformRubricCriteria(payload.id);
    revalidateGradingformRubricCriterias();
  } catch (e) {
    return handleErrors(e);
  }
};