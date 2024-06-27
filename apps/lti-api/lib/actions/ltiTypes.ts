"use server";

import { revalidatePath } from "next/cache";
import {
  createLtiType,
  deleteLtiType,
  updateLtiType,
} from "@/lib/api/ltiTypes/mutations";
import {
  LtiTypeId,
  NewLtiTypeParams,
  UpdateLtiTypeParams,
  ltiTypeIdSchema,
  insertLtiTypeParams,
  updateLtiTypeParams,
} from "@/lib/db/schema/ltiTypes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiTypes = () => revalidatePath("/lti-types");

export const createLtiTypeAction = async (input: NewLtiTypeParams) => {
  try {
    const payload = insertLtiTypeParams.parse(input);
    await createLtiType(payload);
    revalidateLtiTypes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiTypeAction = async (input: UpdateLtiTypeParams) => {
  try {
    const payload = updateLtiTypeParams.parse(input);
    await updateLtiType(payload.id, payload);
    revalidateLtiTypes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiTypeAction = async (input: LtiTypeId) => {
  try {
    const payload = ltiTypeIdSchema.parse({ id: input });
    await deleteLtiType(payload.id);
    revalidateLtiTypes();
  } catch (e) {
    return handleErrors(e);
  }
};