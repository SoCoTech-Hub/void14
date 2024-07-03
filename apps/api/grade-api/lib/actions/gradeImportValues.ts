"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeImportValue,
  deleteGradeImportValue,
  updateGradeImportValue,
} from "@/lib/api/gradeImportValues/mutations";
import {
  GradeImportValueId,
  NewGradeImportValueParams,
  UpdateGradeImportValueParams,
  gradeImportValueIdSchema,
  insertGradeImportValueParams,
  updateGradeImportValueParams,
} from "@/lib/db/schema/gradeImportValues";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeImportValues = () => revalidatePath("/grade-import-values");

export const createGradeImportValueAction = async (input: NewGradeImportValueParams) => {
  try {
    const payload = insertGradeImportValueParams.parse(input);
    await createGradeImportValue(payload);
    revalidateGradeImportValues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeImportValueAction = async (input: UpdateGradeImportValueParams) => {
  try {
    const payload = updateGradeImportValueParams.parse(input);
    await updateGradeImportValue(payload.id, payload);
    revalidateGradeImportValues();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeImportValueAction = async (input: GradeImportValueId) => {
  try {
    const payload = gradeImportValueIdSchema.parse({ id: input });
    await deleteGradeImportValue(payload.id);
    revalidateGradeImportValues();
  } catch (e) {
    return handleErrors(e);
  }
};