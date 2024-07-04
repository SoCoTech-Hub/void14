"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopAssessment,
  deleteWorkshopAssessment,
  updateWorkshopAssessment,
} from "../api/workshopAssessments/mutations";
import {
  insertWorkshopAssessmentParams,
  NewWorkshopAssessmentParams,
  UpdateWorkshopAssessmentParams,
  updateWorkshopAssessmentParams,
  WorkshopAssessmentId,
  workshopAssessmentIdSchema,
} from "../db/schema/workshopAssessments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopAssessments = () =>
  revalidatePath("/workshop-assessments");

export const createWorkshopAssessmentAction = async (
  input: NewWorkshopAssessmentParams,
) => {
  try {
    const payload = insertWorkshopAssessmentParams.parse(input);
    await createWorkshopAssessment(payload);
    revalidateWorkshopAssessments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopAssessmentAction = async (
  input: UpdateWorkshopAssessmentParams,
) => {
  try {
    const payload = updateWorkshopAssessmentParams.parse(input);
    await updateWorkshopAssessment(payload.id, payload);
    revalidateWorkshopAssessments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopAssessmentAction = async (
  input: WorkshopAssessmentId,
) => {
  try {
    const payload = workshopAssessmentIdSchema.parse({ id: input });
    await deleteWorkshopAssessment(payload.id);
    revalidateWorkshopAssessments();
  } catch (e) {
    return handleErrors(e);
  }
};
