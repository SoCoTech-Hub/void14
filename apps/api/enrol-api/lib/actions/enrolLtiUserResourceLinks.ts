"use server";

import { revalidatePath } from "next/cache";
import {
  createEnrolLtiUserResourceLink,
  deleteEnrolLtiUserResourceLink,
  updateEnrolLtiUserResourceLink,
} from "@/lib/api/enrolLtiUserResourceLinks/mutations";
import {
  EnrolLtiUserResourceLinkId,
  NewEnrolLtiUserResourceLinkParams,
  UpdateEnrolLtiUserResourceLinkParams,
  enrolLtiUserResourceLinkIdSchema,
  insertEnrolLtiUserResourceLinkParams,
  updateEnrolLtiUserResourceLinkParams,
} from "@/lib/db/schema/enrolLtiUserResourceLinks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiUserResourceLinks = () => revalidatePath("/enrol-lti-user-resource-links");

export const createEnrolLtiUserResourceLinkAction = async (input: NewEnrolLtiUserResourceLinkParams) => {
  try {
    const payload = insertEnrolLtiUserResourceLinkParams.parse(input);
    await createEnrolLtiUserResourceLink(payload);
    revalidateEnrolLtiUserResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiUserResourceLinkAction = async (input: UpdateEnrolLtiUserResourceLinkParams) => {
  try {
    const payload = updateEnrolLtiUserResourceLinkParams.parse(input);
    await updateEnrolLtiUserResourceLink(payload.id, payload);
    revalidateEnrolLtiUserResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiUserResourceLinkAction = async (input: EnrolLtiUserResourceLinkId) => {
  try {
    const payload = enrolLtiUserResourceLinkIdSchema.parse({ id: input });
    await deleteEnrolLtiUserResourceLink(payload.id);
    revalidateEnrolLtiUserResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};