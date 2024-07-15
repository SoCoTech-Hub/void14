"use server";

import { revalidatePath } from "next/cache";
import {
  createOauth2Endpoint,
  deleteOauth2Endpoint,
  updateOauth2Endpoint,
} from "@/lib/api/oauth2Endpoints/mutations";
import {
  Oauth2EndpointId,
  NewOauth2EndpointParams,
  UpdateOauth2EndpointParams,
  oauth2EndpointIdSchema,
  insertOauth2EndpointParams,
  updateOauth2EndpointParams,
} from "@/lib/db/schema/oauth2Endpoints";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateOauth2Endpoints = () => revalidatePath("/oauth2-endpoints");

export const createOauth2EndpointAction = async (input: NewOauth2EndpointParams) => {
  try {
    const payload = insertOauth2EndpointParams.parse(input);
    await createOauth2Endpoint(payload);
    revalidateOauth2Endpoints();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateOauth2EndpointAction = async (input: UpdateOauth2EndpointParams) => {
  try {
    const payload = updateOauth2EndpointParams.parse(input);
    await updateOauth2Endpoint(payload.id, payload);
    revalidateOauth2Endpoints();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteOauth2EndpointAction = async (input: Oauth2EndpointId) => {
  try {
    const payload = oauth2EndpointIdSchema.parse({ id: input });
    await deleteOauth2Endpoint(payload.id);
    revalidateOauth2Endpoints();
  } catch (e) {
    return handleErrors(e);
  }
};
