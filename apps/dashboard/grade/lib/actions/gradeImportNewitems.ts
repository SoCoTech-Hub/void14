"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeImportNewitem,
  deleteGradeImportNewitem,
  updateGradeImportNewitem,
} from "@/lib/api/gradeImportNewitems/mutations";
import {
  GradeImportNewitemId,
  NewGradeImportNewitemParams,
  UpdateGradeImportNewitemParams,
  gradeImportNewitemIdSchema,
  insertGradeImportNewitemParams,
  updateGradeImportNewitemParams,
} from "@/lib/db/schema/gradeImportNewitems";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeImportNewitems = () => revalidatePath("/grade-import-newitems");

export const createGradeImportNewitemAction = async (input: NewGradeImportNewitemParams) => {
  try {
    const payload = insertGradeImportNewitemParams.parse(input);
    await createGradeImportNewitem(payload);
    revalidateGradeImportNewitems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeImportNewitemAction = async (input: UpdateGradeImportNewitemParams) => {
  try {
    const payload = updateGradeImportNewitemParams.parse(input);
    await updateGradeImportNewitem(payload.id, payload);
    revalidateGradeImportNewitems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeImportNewitemAction = async (input: GradeImportNewitemId) => {
  try {
    const payload = gradeImportNewitemIdSchema.parse({ id: input });
    await deleteGradeImportNewitem(payload.id);
    revalidateGradeImportNewitems();
  } catch (e) {
    return handleErrors(e);
  }
};
