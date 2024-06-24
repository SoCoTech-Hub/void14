"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetServiceEnrolEnrolment,
  deleteMnetServiceEnrolEnrolment,
  updateMnetServiceEnrolEnrolment,
} from "@/lib/api/mnetServiceEnrolEnrolments/mutations";
import {
  MnetServiceEnrolEnrolmentId,
  NewMnetServiceEnrolEnrolmentParams,
  UpdateMnetServiceEnrolEnrolmentParams,
  mnetServiceEnrolEnrolmentIdSchema,
  insertMnetServiceEnrolEnrolmentParams,
  updateMnetServiceEnrolEnrolmentParams,
} from "@/lib/db/schema/mnetServiceEnrolEnrolments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetServiceEnrolEnrolments = () => revalidatePath("/mnet-service-enrol-enrolments");

export const createMnetServiceEnrolEnrolmentAction = async (input: NewMnetServiceEnrolEnrolmentParams) => {
  try {
    const payload = insertMnetServiceEnrolEnrolmentParams.parse(input);
    await createMnetServiceEnrolEnrolment(payload);
    revalidateMnetServiceEnrolEnrolments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetServiceEnrolEnrolmentAction = async (input: UpdateMnetServiceEnrolEnrolmentParams) => {
  try {
    const payload = updateMnetServiceEnrolEnrolmentParams.parse(input);
    await updateMnetServiceEnrolEnrolment(payload.id, payload);
    revalidateMnetServiceEnrolEnrolments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetServiceEnrolEnrolmentAction = async (input: MnetServiceEnrolEnrolmentId) => {
  try {
    const payload = mnetServiceEnrolEnrolmentIdSchema.parse({ id: input });
    await deleteMnetServiceEnrolEnrolment(payload.id);
    revalidateMnetServiceEnrolEnrolments();
  } catch (e) {
    return handleErrors(e);
  }
};