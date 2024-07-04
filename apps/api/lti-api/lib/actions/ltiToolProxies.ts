"use server";

import { revalidatePath } from "next/cache";

import {
  createLtiToolProxy,
  deleteLtiToolProxy,
  updateLtiToolProxy,
} from "../api/ltiToolProxies/mutations";
import {
  insertLtiToolProxyParams,
  LtiToolProxyId,
  ltiToolProxyIdSchema,
  NewLtiToolProxyParams,
  UpdateLtiToolProxyParams,
  updateLtiToolProxyParams,
} from "../db/schema/ltiToolProxies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLtiToolProxies = () => revalidatePath("/lti-tool-proxies");

export const createLtiToolProxyAction = async (
  input: NewLtiToolProxyParams,
) => {
  try {
    const payload = insertLtiToolProxyParams.parse(input);
    await createLtiToolProxy(payload);
    revalidateLtiToolProxies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLtiToolProxyAction = async (
  input: UpdateLtiToolProxyParams,
) => {
  try {
    const payload = updateLtiToolProxyParams.parse(input);
    await updateLtiToolProxy(payload.id, payload);
    revalidateLtiToolProxies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLtiToolProxyAction = async (input: LtiToolProxyId) => {
  try {
    const payload = ltiToolProxyIdSchema.parse({ id: input });
    await deleteLtiToolProxy(payload.id);
    revalidateLtiToolProxies();
  } catch (e) {
    return handleErrors(e);
  }
};
