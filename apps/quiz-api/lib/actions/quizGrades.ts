"use server";

import { revalidatePath } from "next/cache";
import {
  createQuizGrade,
  deleteQuizGrade,
  updateQuizGrade,
} from "@/lib/api/quizGrades/mutations";
import {
  QuizGradeId,
  NewQuizGradeParams,
  UpdateQuizGradeParams,
  quizGradeIdSchema,
  insertQuizGradeParams,
  updateQuizGradeParams,
} from "@/lib/db/schema/quizGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateQuizGrades = () => revalidatePath("/quiz-grades");

export const createQuizGradeAction = async (input: NewQuizGradeParams) => {
  try {
    const payload = insertQuizGradeParams.parse(input);
    await createQuizGrade(payload);
    revalidateQuizGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateQuizGradeAction = async (input: UpdateQuizGradeParams) => {
  try {
    const payload = updateQuizGradeParams.parse(input);
    await updateQuizGrade(payload.id, payload);
    revalidateQuizGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteQuizGradeAction = async (input: QuizGradeId) => {
  try {
    const payload = quizGradeIdSchema.parse({ id: input });
    await deleteQuizGrade(payload.id);
    revalidateQuizGrades();
  } catch (e) {
    return handleErrors(e);
  }
};