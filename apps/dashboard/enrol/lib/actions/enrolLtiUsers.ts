"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiUser,
  deleteEnrolLtiUser,
  updateEnrolLtiUser,
} from "@/lib/api/enrolLtiUsers/mutations";
import {
  EnrolLtiUserId,
  NewEnrolLtiUserParams,
  UpdateEnrolLtiUserParams,
  enrolLtiUserIdSchema,
  insertEnrolLtiUserParams,
  updateEnrolLtiUserParams,
} from "@/lib/db/schema/enrolLtiUsers";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiUsers = () => revalidatePath("/enrol-lti-users");

export const createEnrolLtiUserAction = async (input: NewEnrolLtiUserParams) => {
  try {
    const payload = insertEnrolLtiUserParams.parse(input);
    await createEnrolLtiUser(payload);
    revalidateEnrolLtiUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiUserAction = async (input: UpdateEnrolLtiUserParams) => {
  try {
    const payload = updateEnrolLtiUserParams.parse(input);
    await updateEnrolLtiUser(payload.id, payload);
    revalidateEnrolLtiUsers();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiUserAction = async (input: EnrolLtiUserId) => {
  try {
    const payload = enrolLtiUserIdSchema.parse({ id: input });
    await deleteEnrolLtiUser(payload.id);
    revalidateEnrolLtiUsers();
  } catch (e) {
    return handleErrors(e);
  }
};
