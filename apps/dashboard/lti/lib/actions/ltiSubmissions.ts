"use server";

import { revalidatePath } from "next/cache";
import {
  createLtiSubmission,
  deleteLtiSubmission,
  updateLtiSubmission,
} from "@/lib/api/ltiSubmissions/mutations";
import {
  LtiSubmissionId,
  NewLtiSubmissionParams,
  UpdateLtiSubmissionParams,
  ltiSubmissionIdSchema,
  insertLtiSubmissionParams,
  updateLtiSubmissionParams,
} from "@/lib/db/schema/ltiSubmissions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiSubmissions = () => revalidatePath("/lti-submissions");

export const createLtiSubmissionAction = async (input: NewLtiSubmissionParams) => {
  try {
    const payload = insertLtiSubmissionParams.parse(input);
    await createLtiSubmission(payload);
    revalidateLtiSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiSubmissionAction = async (input: UpdateLtiSubmissionParams) => {
  try {
    const payload = updateLtiSubmissionParams.parse(input);
    await updateLtiSubmission(payload.id, payload);
    revalidateLtiSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiSubmissionAction = async (input: LtiSubmissionId) => {
  try {
    const payload = ltiSubmissionIdSchema.parse({ id: input });
    await deleteLtiSubmission(payload.id);
    revalidateLtiSubmissions();
  } catch (e) {
    return handleErrors(e);
  }
};
