"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignSubmissionOnlineText,
  deleteAssignSubmissionOnlineText,
  updateAssignSubmissionOnlineText,
} from "@/lib/api/assignSubmissionOnlineTexts/mutations";
import {
  AssignSubmissionOnlineTextId,
  NewAssignSubmissionOnlineTextParams,
  UpdateAssignSubmissionOnlineTextParams,
  assignSubmissionOnlineTextIdSchema,
  insertAssignSubmissionOnlineTextParams,
  updateAssignSubmissionOnlineTextParams,
} from "@/lib/db/schema/assignSubmissionOnlineTexts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignSubmissionOnlineTexts = () => revalidatePath("/assign-submission-online-texts");

export const createAssignSubmissionOnlineTextAction = async (input: NewAssignSubmissionOnlineTextParams) => {
  try {
    const payload = insertAssignSubmissionOnlineTextParams.parse(input);
    await createAssignSubmissionOnlineText(payload);
    revalidateAssignSubmissionOnlineTexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignSubmissionOnlineTextAction = async (input: UpdateAssignSubmissionOnlineTextParams) => {
  try {
    const payload = updateAssignSubmissionOnlineTextParams.parse(input);
    await updateAssignSubmissionOnlineText(payload.id, payload);
    revalidateAssignSubmissionOnlineTexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignSubmissionOnlineTextAction = async (input: AssignSubmissionOnlineTextId) => {
  try {
    const payload = assignSubmissionOnlineTextIdSchema.parse({ id: input });
    await deleteAssignSubmissionOnlineText(payload.id);
    revalidateAssignSubmissionOnlineTexts();
  } catch (e) {
    return handleErrors(e);
  }
};
