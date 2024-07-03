"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiLti2ShareKey,
  deleteEnrolLtiLti2ShareKey,
  updateEnrolLtiLti2ShareKey,
} from "@/lib/api/enrolLtiLti2ShareKeys/mutations";
import {
  EnrolLtiLti2ShareKeyId,
  NewEnrolLtiLti2ShareKeyParams,
  UpdateEnrolLtiLti2ShareKeyParams,
  enrolLtiLti2ShareKeyIdSchema,
  insertEnrolLtiLti2ShareKeyParams,
  updateEnrolLtiLti2ShareKeyParams,
} from "@/lib/db/schema/enrolLtiLti2ShareKeys";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2ShareKeys = () => revalidatePath("/enrol-lti-lti2-share-keys");

export const createEnrolLtiLti2ShareKeyAction = async (input: NewEnrolLtiLti2ShareKeyParams) => {
  try {
    const payload = insertEnrolLtiLti2ShareKeyParams.parse(input);
    await createEnrolLtiLti2ShareKey(payload);
    revalidateEnrolLtiLti2ShareKeys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2ShareKeyAction = async (input: UpdateEnrolLtiLti2ShareKeyParams) => {
  try {
    const payload = updateEnrolLtiLti2ShareKeyParams.parse(input);
    await updateEnrolLtiLti2ShareKey(payload.id, payload);
    revalidateEnrolLtiLti2ShareKeys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2ShareKeyAction = async (input: EnrolLtiLti2ShareKeyId) => {
  try {
    const payload = enrolLtiLti2ShareKeyIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2ShareKey(payload.id);
    revalidateEnrolLtiLti2ShareKeys();
  } catch (e) {
    return handleErrors(e);
  }
};