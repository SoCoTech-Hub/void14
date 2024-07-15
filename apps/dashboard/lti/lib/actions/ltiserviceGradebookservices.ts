"use server";

import { revalidatePath } from "next/cache";
import {
  createLtiserviceGradebookservice,
  deleteLtiserviceGradebookservice,
  updateLtiserviceGradebookservice,
} from "@/lib/api/ltiserviceGradebookservices/mutations";
import {
  LtiserviceGradebookserviceId,
  NewLtiserviceGradebookserviceParams,
  UpdateLtiserviceGradebookserviceParams,
  ltiserviceGradebookserviceIdSchema,
  insertLtiserviceGradebookserviceParams,
  updateLtiserviceGradebookserviceParams,
} from "@/lib/db/schema/ltiserviceGradebookservices";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiserviceGradebookservices = () => revalidatePath("/ltiservice-gradebookservices");

export const createLtiserviceGradebookserviceAction = async (input: NewLtiserviceGradebookserviceParams) => {
  try {
    const payload = insertLtiserviceGradebookserviceParams.parse(input);
    await createLtiserviceGradebookservice(payload);
    revalidateLtiserviceGradebookservices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiserviceGradebookserviceAction = async (input: UpdateLtiserviceGradebookserviceParams) => {
  try {
    const payload = updateLtiserviceGradebookserviceParams.parse(input);
    await updateLtiserviceGradebookservice(payload.id, payload);
    revalidateLtiserviceGradebookservices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiserviceGradebookserviceAction = async (input: LtiserviceGradebookserviceId) => {
  try {
    const payload = ltiserviceGradebookserviceIdSchema.parse({ id: input });
    await deleteLtiserviceGradebookservice(payload.id);
    revalidateLtiserviceGradebookservices();
  } catch (e) {
    return handleErrors(e);
  }
};
