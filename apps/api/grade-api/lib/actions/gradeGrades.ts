"use server";

import { revalidatePath } from "next/cache";

import {
  createGradeGrade,
  deleteGradeGrade,
  updateGradeGrade,
} from "../api/gradeGrades/mutations";
import {
  GradeGradeId,
  gradeGradeIdSchema,
  insertGradeGradeParams,
  NewGradeGradeParams,
  UpdateGradeGradeParams,
  updateGradeGradeParams,
} from "../db/schema/gradeGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeGrades = () => revalidatePath("/grade-grades");

export const createGradeGradeAction = async (input: NewGradeGradeParams) => {
  try {
    const payload = insertGradeGradeParams.parse(input);
    await createGradeGrade(payload);
    revalidateGradeGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeGradeAction = async (input: UpdateGradeGradeParams) => {
  try {
    const payload = updateGradeGradeParams.parse(input);
    await updateGradeGrade(payload.id, payload);
    revalidateGradeGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeGradeAction = async (input: GradeGradeId) => {
  try {
    const payload = gradeGradeIdSchema.parse({ id: input });
    await deleteGradeGrade(payload.id);
    revalidateGradeGrades();
  } catch (e) {
    return handleErrors(e);
  }
};
