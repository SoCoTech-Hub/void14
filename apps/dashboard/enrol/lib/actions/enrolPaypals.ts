"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolPaypal,
  deleteEnrolPaypal,
  updateEnrolPaypal,
} from "@/lib/api/enrolPaypals/mutations";
import {
  EnrolPaypalId,
  NewEnrolPaypalParams,
  UpdateEnrolPaypalParams,
  enrolPaypalIdSchema,
  insertEnrolPaypalParams,
  updateEnrolPaypalParams,
} from "@/lib/db/schema/enrolPaypals";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolPaypals = () => revalidatePath("/enrol-paypals");

export const createEnrolPaypalAction = async (input: NewEnrolPaypalParams) => {
  try {
    const payload = insertEnrolPaypalParams.parse(input);
    await createEnrolPaypal(payload);
    revalidateEnrolPaypals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolPaypalAction = async (input: UpdateEnrolPaypalParams) => {
  try {
    const payload = updateEnrolPaypalParams.parse(input);
    await updateEnrolPaypal(payload.id, payload);
    revalidateEnrolPaypals();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolPaypalAction = async (input: EnrolPaypalId) => {
  try {
    const payload = enrolPaypalIdSchema.parse({ id: input });
    await deleteEnrolPaypal(payload.id);
    revalidateEnrolPaypals();
  } catch (e) {
    return handleErrors(e);
  }
};