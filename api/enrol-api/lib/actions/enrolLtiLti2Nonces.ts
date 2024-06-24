"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiLti2Nonce,
  deleteEnrolLtiLti2Nonce,
  updateEnrolLtiLti2Nonce,
} from "@/lib/api/enrolLtiLti2Nonces/mutations";
import {
  EnrolLtiLti2NonceId,
  NewEnrolLtiLti2NonceParams,
  UpdateEnrolLtiLti2NonceParams,
  enrolLtiLti2NonceIdSchema,
  insertEnrolLtiLti2NonceParams,
  updateEnrolLtiLti2NonceParams,
} from "@/lib/db/schema/enrolLtiLti2Nonces";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2Nonces = () => revalidatePath("/enrol-lti-lti2-nonces");

export const createEnrolLtiLti2NonceAction = async (input: NewEnrolLtiLti2NonceParams) => {
  try {
    const payload = insertEnrolLtiLti2NonceParams.parse(input);
    await createEnrolLtiLti2Nonce(payload);
    revalidateEnrolLtiLti2Nonces();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2NonceAction = async (input: UpdateEnrolLtiLti2NonceParams) => {
  try {
    const payload = updateEnrolLtiLti2NonceParams.parse(input);
    await updateEnrolLtiLti2Nonce(payload.id, payload);
    revalidateEnrolLtiLti2Nonces();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2NonceAction = async (input: EnrolLtiLti2NonceId) => {
  try {
    const payload = enrolLtiLti2NonceIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2Nonce(payload.id);
    revalidateEnrolLtiLti2Nonces();
  } catch (e) {
    return handleErrors(e);
  }
};