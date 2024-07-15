"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignGrade,
  deleteAssignGrade,
  updateAssignGrade,
} from "@/lib/api/assignGrades/mutations";
import {
  AssignGradeId,
  NewAssignGradeParams,
  UpdateAssignGradeParams,
  assignGradeIdSchema,
  insertAssignGradeParams,
  updateAssignGradeParams,
} from "@/lib/db/schema/assignGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignGrades = () => revalidatePath("/assign-grades");

export const createAssignGradeAction = async (input: NewAssignGradeParams) => {
  try {
    const payload = insertAssignGradeParams.parse(input);
    await createAssignGrade(payload);
    revalidateAssignGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignGradeAction = async (input: UpdateAssignGradeParams) => {
  try {
    const payload = updateAssignGradeParams.parse(input);
    await updateAssignGrade(payload.id, payload);
    revalidateAssignGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignGradeAction = async (input: AssignGradeId) => {
  try {
    const payload = assignGradeIdSchema.parse({ id: input });
    await deleteAssignGrade(payload.id);
    revalidateAssignGrades();
  } catch (e) {
    return handleErrors(e);
  }
};
