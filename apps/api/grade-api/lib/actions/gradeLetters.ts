"use server";

import { revalidatePath } from "next/cache";
import {
  createGradeLetter,
  deleteGradeLetter,
  updateGradeLetter,
} from "@/lib/api/gradeLetters/mutations";
import {
  GradeLetterId,
  NewGradeLetterParams,
  UpdateGradeLetterParams,
  gradeLetterIdSchema,
  insertGradeLetterParams,
  updateGradeLetterParams,
} from "@/lib/db/schema/gradeLetters";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeLetters = () => revalidatePath("/grade-letters");

export const createGradeLetterAction = async (input: NewGradeLetterParams) => {
  try {
    const payload = insertGradeLetterParams.parse(input);
    await createGradeLetter(payload);
    revalidateGradeLetters();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeLetterAction = async (input: UpdateGradeLetterParams) => {
  try {
    const payload = updateGradeLetterParams.parse(input);
    await updateGradeLetter(payload.id, payload);
    revalidateGradeLetters();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeLetterAction = async (input: GradeLetterId) => {
  try {
    const payload = gradeLetterIdSchema.parse({ id: input });
    await deleteGradeLetter(payload.id);
    revalidateGradeLetters();
  } catch (e) {
    return handleErrors(e);
  }
};