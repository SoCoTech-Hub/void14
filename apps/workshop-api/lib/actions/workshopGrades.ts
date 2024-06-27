"use server";

import { revalidatePath } from "next/cache";
import {
  createWorkshopGrade,
  deleteWorkshopGrade,
  updateWorkshopGrade,
} from "@/lib/api/workshopGrades/mutations";
import {
  WorkshopGradeId,
  NewWorkshopGradeParams,
  UpdateWorkshopGradeParams,
  workshopGradeIdSchema,
  insertWorkshopGradeParams,
  updateWorkshopGradeParams,
} from "@/lib/db/schema/workshopGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateWorkshopGrades = () => revalidatePath("/workshop-grades");

export const createWorkshopGradeAction = async (input: NewWorkshopGradeParams) => {
  try {
    const payload = insertWorkshopGradeParams.parse(input);
    await createWorkshopGrade(payload);
    revalidateWorkshopGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateWorkshopGradeAction = async (input: UpdateWorkshopGradeParams) => {
  try {
    const payload = updateWorkshopGradeParams.parse(input);
    await updateWorkshopGrade(payload.id, payload);
    revalidateWorkshopGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteWorkshopGradeAction = async (input: WorkshopGradeId) => {
  try {
    const payload = workshopGradeIdSchema.parse({ id: input });
    await deleteWorkshopGrade(payload.id);
    revalidateWorkshopGrades();
  } catch (e) {
    return handleErrors(e);
  }
};