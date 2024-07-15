"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiResourceLink,
  deleteEnrolLtiResourceLink,
  updateEnrolLtiResourceLink,
} from "@/lib/api/enrolLtiResourceLinks/mutations";
import {
  EnrolLtiResourceLinkId,
  NewEnrolLtiResourceLinkParams,
  UpdateEnrolLtiResourceLinkParams,
  enrolLtiResourceLinkIdSchema,
  insertEnrolLtiResourceLinkParams,
  updateEnrolLtiResourceLinkParams,
} from "@/lib/db/schema/enrolLtiResourceLinks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiResourceLinks = () => revalidatePath("/enrol-lti-resource-links");

export const createEnrolLtiResourceLinkAction = async (input: NewEnrolLtiResourceLinkParams) => {
  try {
    const payload = insertEnrolLtiResourceLinkParams.parse(input);
    await createEnrolLtiResourceLink(payload);
    revalidateEnrolLtiResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiResourceLinkAction = async (input: UpdateEnrolLtiResourceLinkParams) => {
  try {
    const payload = updateEnrolLtiResourceLinkParams.parse(input);
    await updateEnrolLtiResourceLink(payload.id, payload);
    revalidateEnrolLtiResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiResourceLinkAction = async (input: EnrolLtiResourceLinkId) => {
  try {
    const payload = enrolLtiResourceLinkIdSchema.parse({ id: input });
    await deleteEnrolLtiResourceLink(payload.id);
    revalidateEnrolLtiResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};
