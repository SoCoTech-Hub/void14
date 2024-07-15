"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiLti2UserResult,
  deleteEnrolLtiLti2UserResult,
  updateEnrolLtiLti2UserResult,
} from "@/lib/api/enrolLtiLti2UserResults/mutations";
import {
  EnrolLtiLti2UserResultId,
  NewEnrolLtiLti2UserResultParams,
  UpdateEnrolLtiLti2UserResultParams,
  enrolLtiLti2UserResultIdSchema,
  insertEnrolLtiLti2UserResultParams,
  updateEnrolLtiLti2UserResultParams,
} from "@/lib/db/schema/enrolLtiLti2UserResults";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2UserResults = () => revalidatePath("/enrol-lti-lti2-user-results");

export const createEnrolLtiLti2UserResultAction = async (input: NewEnrolLtiLti2UserResultParams) => {
  try {
    const payload = insertEnrolLtiLti2UserResultParams.parse(input);
    await createEnrolLtiLti2UserResult(payload);
    revalidateEnrolLtiLti2UserResults();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2UserResultAction = async (input: UpdateEnrolLtiLti2UserResultParams) => {
  try {
    const payload = updateEnrolLtiLti2UserResultParams.parse(input);
    await updateEnrolLtiLti2UserResult(payload.id, payload);
    revalidateEnrolLtiLti2UserResults();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2UserResultAction = async (input: EnrolLtiLti2UserResultId) => {
  try {
    const payload = enrolLtiLti2UserResultIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2UserResult(payload.id);
    revalidateEnrolLtiLti2UserResults();
  } catch (e) {
    return handleErrors(e);
  }
};
