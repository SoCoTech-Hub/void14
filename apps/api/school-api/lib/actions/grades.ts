"use server";

import { revalidatePath } from "next/cache";

import { createGrade, deleteGrade, updateGrade } from "../api/grades/mutations";
import {
  GradeId,
  gradeIdSchema,
  insertGradeParams,
  NewGradeParams,
  UpdateGradeParams,
  updateGradeParams,
} from "../db/schema/grades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGrades = () => revalidatePath("/grades");

export const createGradeAction = async (input: NewGradeParams) => {
  try {
    const payload = insertGradeParams.parse(input);
    await createGrade(payload);
    revalidateGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeAction = async (input: UpdateGradeParams) => {
  try {
    const payload = updateGradeParams.parse(input);
    await updateGrade(payload.id, payload);
    revalidateGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeAction = async (input: GradeId) => {
  try {
    const payload = gradeIdSchema.parse({ id: input });
    await deleteGrade(payload.id);
    revalidateGrades();
  } catch (e) {
    return handleErrors(e);
  }
};
