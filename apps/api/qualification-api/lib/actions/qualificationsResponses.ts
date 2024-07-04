"use server";

import { revalidatePath } from "next/cache";

import {
  createQualificationsResponse,
  deleteQualificationsResponse,
  updateQualificationsResponse,
} from "../api/qualificationsResponses/mutations";
import {
  insertQualificationsResponseParams,
  NewQualificationsResponseParams,
  QualificationsResponseId,
  qualificationsResponseIdSchema,
  UpdateQualificationsResponseParams,
  updateQualificationsResponseParams,
} from "../db/schema/qualificationsResponses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQualificationsResponses = () =>
  revalidatePath("/qualifications-responses");

export const createQualificationsResponseAction = async (
  input: NewQualificationsResponseParams,
) => {
  try {
    const payload = insertQualificationsResponseParams.parse(input);
    await createQualificationsResponse(payload);
    revalidateQualificationsResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQualificationsResponseAction = async (
  input: UpdateQualificationsResponseParams,
) => {
  try {
    const payload = updateQualificationsResponseParams.parse(input);
    await updateQualificationsResponse(payload.id, payload);
    revalidateQualificationsResponses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQualificationsResponseAction = async (
  input: QualificationsResponseId,
) => {
  try {
    const payload = qualificationsResponseIdSchema.parse({ id: input });
    await deleteQualificationsResponse(payload.id);
    revalidateQualificationsResponses();
  } catch (e) {
    return handleErrors(e);
  }
};
