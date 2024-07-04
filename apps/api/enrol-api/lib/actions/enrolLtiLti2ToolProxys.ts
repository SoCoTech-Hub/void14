"use server";

import { revalidatePath } from "next/cache";

import {
  createEnrolLtiLti2ToolProxy,
  deleteEnrolLtiLti2ToolProxy,
  updateEnrolLtiLti2ToolProxy,
} from "../api/enrolLtiLti2ToolProxys/mutations";
import {
  EnrolLtiLti2ToolProxyId,
  enrolLtiLti2ToolProxyIdSchema,
  insertEnrolLtiLti2ToolProxyParams,
  NewEnrolLtiLti2ToolProxyParams,
  UpdateEnrolLtiLti2ToolProxyParams,
  updateEnrolLtiLti2ToolProxyParams,
} from "../db/schema/enrolLtiLti2ToolProxys";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateEnrolLtiLti2ToolProxys = () =>
  revalidatePath("/enrol-lti-lti2-tool-proxys");

export const createEnrolLtiLti2ToolProxyAction = async (
  input: NewEnrolLtiLti2ToolProxyParams,
) => {
  try {
    const payload = insertEnrolLtiLti2ToolProxyParams.parse(input);
    await createEnrolLtiLti2ToolProxy(payload);
    revalidateEnrolLtiLti2ToolProxys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateEnrolLtiLti2ToolProxyAction = async (
  input: UpdateEnrolLtiLti2ToolProxyParams,
) => {
  try {
    const payload = updateEnrolLtiLti2ToolProxyParams.parse(input);
    await updateEnrolLtiLti2ToolProxy(payload.id, payload);
    revalidateEnrolLtiLti2ToolProxys();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteEnrolLtiLti2ToolProxyAction = async (
  input: EnrolLtiLti2ToolProxyId,
) => {
  try {
    const payload = enrolLtiLti2ToolProxyIdSchema.parse({ id: input });
    await deleteEnrolLtiLti2ToolProxy(payload.id);
    revalidateEnrolLtiLti2ToolProxys();
  } catch (e) {
    return handleErrors(e);
  }
};
