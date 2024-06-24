"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiContext,
  deleteEnrolLtiContext,
  updateEnrolLtiContext,
} from "@/lib/api/enrolLtiContexts/mutations";
import {
  EnrolLtiContextId,
  NewEnrolLtiContextParams,
  UpdateEnrolLtiContextParams,
  enrolLtiContextIdSchema,
  insertEnrolLtiContextParams,
  updateEnrolLtiContextParams,
} from "@/lib/db/schema/enrolLtiContexts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiContexts = () => revalidatePath("/enrol-lti-contexts");

export const createEnrolLtiContextAction = async (input: NewEnrolLtiContextParams) => {
  try {
    const payload = insertEnrolLtiContextParams.parse(input);
    await createEnrolLtiContext(payload);
    revalidateEnrolLtiContexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiContextAction = async (input: UpdateEnrolLtiContextParams) => {
  try {
    const payload = updateEnrolLtiContextParams.parse(input);
    await updateEnrolLtiContext(payload.id, payload);
    revalidateEnrolLtiContexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiContextAction = async (input: EnrolLtiContextId) => {
  try {
    const payload = enrolLtiContextIdSchema.parse({ id: input });
    await deleteEnrolLtiContext(payload.id);
    revalidateEnrolLtiContexts();
  } catch (e) {
    return handleErrors(e);
  }
};