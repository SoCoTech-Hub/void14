"use server";

import { revalidatePath } from "next/cache";
import {
  createForumGrade,
  deleteForumGrade,
  updateForumGrade,
} from "@/lib/api/forumGrades/mutations";
import {
  ForumGradeId,
  NewForumGradeParams,
  UpdateForumGradeParams,
  forumGradeIdSchema,
  insertForumGradeParams,
  updateForumGradeParams,
} from "@/lib/db/schema/forumGrades";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateForumGrades = () => revalidatePath("/forum-grades");

export const createForumGradeAction = async (input: NewForumGradeParams) => {
  try {
    const payload = insertForumGradeParams.parse(input);
    await createForumGrade(payload);
    revalidateForumGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateForumGradeAction = async (input: UpdateForumGradeParams) => {
  try {
    const payload = updateForumGradeParams.parse(input);
    await updateForumGrade(payload.id, payload);
    revalidateForumGrades();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteForumGradeAction = async (input: ForumGradeId) => {
  try {
    const payload = forumGradeIdSchema.parse({ id: input });
    await deleteForumGrade(payload.id);
    revalidateForumGrades();
  } catch (e) {
    return handleErrors(e);
  }
};
