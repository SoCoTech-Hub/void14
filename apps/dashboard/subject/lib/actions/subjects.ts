"use server";

import { revalidatePath } from "next/cache";
import {
  createSubject,
  deleteSubject,
  updateSubject,
} from "@/lib/api/subjects/mutations";
import {
  SubjectId,
  NewSubjectParams,
  UpdateSubjectParams,
  subjectIdSchema,
  insertSubjectParams,
  updateSubjectParams,
} from "@/lib/db/schema/subjects";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSubjects = () => revalidatePath("/subjects");

export const createSubjectAction = async (input: NewSubjectParams) => {
  try {
    const payload = insertSubjectParams.parse(input);
    await createSubject(payload);
    revalidateSubjects();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSubjectAction = async (input: UpdateSubjectParams) => {
  try {
    const payload = updateSubjectParams.parse(input);
    await updateSubject(payload.id, payload);
    revalidateSubjects();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSubjectAction = async (input: SubjectId) => {
  try {
    const payload = subjectIdSchema.parse({ id: input });
    await deleteSubject(payload.id);
    revalidateSubjects();
  } catch (e) {
    return handleErrors(e);
  }
};
