"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiDeployment,
  deleteEnrolLtiDeployment,
  updateEnrolLtiDeployment,
} from "@/lib/api/enrolLtiDeployments/mutations";
import {
  EnrolLtiDeploymentId,
  NewEnrolLtiDeploymentParams,
  UpdateEnrolLtiDeploymentParams,
  enrolLtiDeploymentIdSchema,
  insertEnrolLtiDeploymentParams,
  updateEnrolLtiDeploymentParams,
} from "@/lib/db/schema/enrolLtiDeployments";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiDeployments = () => revalidatePath("/enrol-lti-deployments");

export const createEnrolLtiDeploymentAction = async (input: NewEnrolLtiDeploymentParams) => {
  try {
    const payload = insertEnrolLtiDeploymentParams.parse(input);
    await createEnrolLtiDeployment(payload);
    revalidateEnrolLtiDeployments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiDeploymentAction = async (input: UpdateEnrolLtiDeploymentParams) => {
  try {
    const payload = updateEnrolLtiDeploymentParams.parse(input);
    await updateEnrolLtiDeployment(payload.id, payload);
    revalidateEnrolLtiDeployments();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiDeploymentAction = async (input: EnrolLtiDeploymentId) => {
  try {
    const payload = enrolLtiDeploymentIdSchema.parse({ id: input });
    await deleteEnrolLtiDeployment(payload.id);
    revalidateEnrolLtiDeployments();
  } catch (e) {
    return handleErrors(e);
  }
};
