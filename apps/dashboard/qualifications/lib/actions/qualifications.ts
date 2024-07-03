"use server";

import { revalidatePath } from "next/cache";
import {
  createQualification,
  deleteQualification,
  updateQualification,
} from "@/lib/api/qualifications/mutations";
import {
  QualificationId,
  NewQualificationParams,
  UpdateQualificationParams,
  qualificationIdSchema,
  insertQualificationParams,
  updateQualificationParams,
} from "@/lib/db/schema/qualifications";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQualifications = () => revalidatePath("/qualifications");

export const createQualificationAction = async (input: NewQualificationParams) => {
  try {
    const payload = insertQualificationParams.parse(input);
    await createQualification(payload);
    revalidateQualifications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQualificationAction = async (input: UpdateQualificationParams) => {
  try {
    const payload = updateQualificationParams.parse(input);
    await updateQualification(payload.id, payload);
    revalidateQualifications();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQualificationAction = async (input: QualificationId) => {
  try {
    const payload = qualificationIdSchema.parse({ id: input });
    await deleteQualification(payload.id);
    revalidateQualifications();
  } catch (e) {
    return handleErrors(e);
  }
};