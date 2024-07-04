"use server";

import { revalidatePath } from "next/cache";

import {
  createGradeItem,
  deleteGradeItem,
  updateGradeItem,
} from "../api/gradeItems/mutations";
import {
  GradeItemId,
  gradeItemIdSchema,
  insertGradeItemParams,
  NewGradeItemParams,
  UpdateGradeItemParams,
  updateGradeItemParams,
} from "../db/schema/gradeItems";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGradeItems = () => revalidatePath("/grade-items");

export const createGradeItemAction = async (input: NewGradeItemParams) => {
  try {
    const payload = insertGradeItemParams.parse(input);
    await createGradeItem(payload);
    revalidateGradeItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGradeItemAction = async (input: UpdateGradeItemParams) => {
  try {
    const payload = updateGradeItemParams.parse(input);
    await updateGradeItem(payload.id, payload);
    revalidateGradeItems();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGradeItemAction = async (input: GradeItemId) => {
  try {
    const payload = gradeItemIdSchema.parse({ id: input });
    await deleteGradeItem(payload.id);
    revalidateGradeItems();
  } catch (e) {
    return handleErrors(e);
  }
};
