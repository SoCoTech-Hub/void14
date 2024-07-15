"use server";

import { revalidatePath } from "next/cache";
import {
  createUserGrade,
  deleteUserGrade,
  updateUserGrade,
} from "@/lib/api/userGrades/mutations";
import {
  UserGradeId,
  NewUserGradeParams,
  UpdateUserGradeParams,
  userGradeIdSchema,
  insertUserGradeParams,
  updateUserGradeParams,
} from "@/lib/db/schema/userGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateUserGrades = () => revalidatePath("/user-grades");

export const createUserGradeAction = async (input: NewUserGradeParams) => {
  try {
    const payload = insertUserGradeParams.parse(input);
    await createUserGrade(payload);
    revalidateUserGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateUserGradeAction = async (input: UpdateUserGradeParams) => {
  try {
    const payload = updateUserGradeParams.parse(input);
    await updateUserGrade(payload.id, payload);
    revalidateUserGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteUserGradeAction = async (input: UserGradeId) => {
  try {
    const payload = userGradeIdSchema.parse({ id: input });
    await deleteUserGrade(payload.id);
    revalidateUserGrades();
  } catch (e) {
    return handleErrors(e);
  }
};
