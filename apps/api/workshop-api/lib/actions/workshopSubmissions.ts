"use server";

import { revalidatePath } from "next/cache";

import {
  createWorkshopSubmission,
  deleteWorkshopSubmission,
  updateWorkshopSubmission,
} from "../api/workshopSubmissions/mutations";
import {
  insertWorkshopSubmissionParams,
  NewWorkshopSubmissionParams,
  UpdateWorkshopSubmissionParams,
  updateWorkshopSubmissionParams,
  WorkshopSubmissionId,
  workshopSubmissionIdSchema,
} from "../db/schema/workshopSubmissions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopSubmissions = () =>
  revalidatePath("/workshop-submissions");

export const createWorkshopSubmissionAction = async (
  input: NewWorkshopSubmissionParams,
) => {
  try {
    const payload = insertWorkshopSubmissionParams.parse(input);
    await createWorkshopSubmission(payload);
    revalidateWorkshopSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopSubmissionAction = async (
  input: UpdateWorkshopSubmissionParams,
) => {
  try {
    const payload = updateWorkshopSubmissionParams.parse(input);
    await updateWorkshopSubmission(payload.id, payload);
    revalidateWorkshopSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopSubmissionAction = async (
  input: WorkshopSubmissionId,
) => {
  try {
    const payload = workshopSubmissionIdSchema.parse({ id: input });
    await deleteWorkshopSubmission(payload.id);
    revalidateWorkshopSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};
