"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiTool,
  deleteEnrolLtiTool,
  updateEnrolLtiTool,
} from "@/lib/api/enrolLtiTools/mutations";
import {
  EnrolLtiToolId,
  NewEnrolLtiToolParams,
  UpdateEnrolLtiToolParams,
  enrolLtiToolIdSchema,
  insertEnrolLtiToolParams,
  updateEnrolLtiToolParams,
} from "@/lib/db/schema/enrolLtiTools";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiTools = () => revalidatePath("/enrol-lti-tools");

export const createEnrolLtiToolAction = async (input: NewEnrolLtiToolParams) => {
  try {
    const payload = insertEnrolLtiToolParams.parse(input);
    await createEnrolLtiTool(payload);
    revalidateEnrolLtiTools();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiToolAction = async (input: UpdateEnrolLtiToolParams) => {
  try {
    const payload = updateEnrolLtiToolParams.parse(input);
    await updateEnrolLtiTool(payload.id, payload);
    revalidateEnrolLtiTools();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiToolAction = async (input: EnrolLtiToolId) => {
  try {
    const payload = enrolLtiToolIdSchema.parse({ id: input });
    await deleteEnrolLtiTool(payload.id);
    revalidateEnrolLtiTools();
  } catch (e) {
    return handleErrors(e);
  }
};