"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiLti2Context,
  deleteEnrolLtiLti2Context,
  updateEnrolLtiLti2Context,
} from "@/lib/api/enrolLtiLti2Contexts/mutations";
import {
  EnrolLtiLti2ContextId,
  NewEnrolLtiLti2ContextParams,
  UpdateEnrolLtiLti2ContextParams,
  enrolLtiLti2ContextIdSchema,
  insertEnrolLtiLti2ContextParams,
  updateEnrolLtiLti2ContextParams,
} from "@/lib/db/schema/enrolLtiLti2Contexts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2Contexts = () => revalidatePath("/enrol-lti-lti2-contexts");

export const createEnrolLtiLti2ContextAction = async (input: NewEnrolLtiLti2ContextParams) => {
  try {
    const payload = insertEnrolLtiLti2ContextParams.parse(input);
    await createEnrolLtiLti2Context(payload);
    revalidateEnrolLtiLti2Contexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2ContextAction = async (input: UpdateEnrolLtiLti2ContextParams) => {
  try {
    const payload = updateEnrolLtiLti2ContextParams.parse(input);
    await updateEnrolLtiLti2Context(payload.id, payload);
    revalidateEnrolLtiLti2Contexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2ContextAction = async (input: EnrolLtiLti2ContextId) => {
  try {
    const payload = enrolLtiLti2ContextIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2Context(payload.id);
    revalidateEnrolLtiLti2Contexts();
  } catch (e) {
    return handleErrors(e);
  }
};