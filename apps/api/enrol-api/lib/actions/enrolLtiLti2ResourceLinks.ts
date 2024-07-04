"use server";

import { revalidatePath } from "next/cache";

import {
  createEnrolLtiLti2ResourceLink,
  deleteEnrolLtiLti2ResourceLink,
  updateEnrolLtiLti2ResourceLink,
} from "../api/enrolLtiLti2ResourceLinks/mutations";
import {
  EnrolLtiLti2ResourceLinkId,
  enrolLtiLti2ResourceLinkIdSchema,
  insertEnrolLtiLti2ResourceLinkParams,
  NewEnrolLtiLti2ResourceLinkParams,
  UpdateEnrolLtiLti2ResourceLinkParams,
  updateEnrolLtiLti2ResourceLinkParams,
} from "../db/schema/enrolLtiLti2ResourceLinks";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2ResourceLinks = () =>
  revalidatePath("/enrol-lti-lti2-resource-links");

export const createEnrolLtiLti2ResourceLinkAction = async (
  input: NewEnrolLtiLti2ResourceLinkParams,
) => {
  try {
    const payload = insertEnrolLtiLti2ResourceLinkParams.parse(input);
    await createEnrolLtiLti2ResourceLink(payload);
    revalidateEnrolLtiLti2ResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2ResourceLinkAction = async (
  input: UpdateEnrolLtiLti2ResourceLinkParams,
) => {
  try {
    const payload = updateEnrolLtiLti2ResourceLinkParams.parse(input);
    await updateEnrolLtiLti2ResourceLink(payload.id, payload);
    revalidateEnrolLtiLti2ResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2ResourceLinkAction = async (
  input: EnrolLtiLti2ResourceLinkId,
) => {
  try {
    const payload = enrolLtiLti2ResourceLinkIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2ResourceLink(payload.id);
    revalidateEnrolLtiLti2ResourceLinks();
  } catch (e) {
    return handleErrors(e);
  }
};
