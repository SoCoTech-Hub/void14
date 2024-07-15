"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiAppRegistration,
  deleteEnrolLtiAppRegistration,
  updateEnrolLtiAppRegistration,
} from "@/lib/api/enrolLtiAppRegistrations/mutations";
import {
  EnrolLtiAppRegistrationId,
  NewEnrolLtiAppRegistrationParams,
  UpdateEnrolLtiAppRegistrationParams,
  enrolLtiAppRegistrationIdSchema,
  insertEnrolLtiAppRegistrationParams,
  updateEnrolLtiAppRegistrationParams,
} from "@/lib/db/schema/enrolLtiAppRegistrations";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiAppRegistrations = () => revalidatePath("/enrol-lti-app-registrations");

export const createEnrolLtiAppRegistrationAction = async (input: NewEnrolLtiAppRegistrationParams) => {
  try {
    const payload = insertEnrolLtiAppRegistrationParams.parse(input);
    await createEnrolLtiAppRegistration(payload);
    revalidateEnrolLtiAppRegistrations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiAppRegistrationAction = async (input: UpdateEnrolLtiAppRegistrationParams) => {
  try {
    const payload = updateEnrolLtiAppRegistrationParams.parse(input);
    await updateEnrolLtiAppRegistration(payload.id, payload);
    revalidateEnrolLtiAppRegistrations();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiAppRegistrationAction = async (input: EnrolLtiAppRegistrationId) => {
  try {
    const payload = enrolLtiAppRegistrationIdSchema.parse({ id: input });
    await deleteEnrolLtiAppRegistration(payload.id);
    revalidateEnrolLtiAppRegistrations();
  } catch (e) {
    return handleErrors(e);
  }
};
