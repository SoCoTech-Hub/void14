"use server";

import { revalidatePath } from "next/cache";

import {
  createToolDataprivacyRequest,
  deleteToolDataprivacyRequest,
  updateToolDataprivacyRequest,
} from "../api/toolDataprivacyRequests/mutations";
import {
  insertToolDataprivacyRequestParams,
  NewToolDataprivacyRequestParams,
  ToolDataprivacyRequestId,
  toolDataprivacyRequestIdSchema,
  UpdateToolDataprivacyRequestParams,
  updateToolDataprivacyRequestParams,
} from "../db/schema/toolDataprivacyRequests";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyRequests = () =>
  revalidatePath("/tool-dataprivacy-requests");

export const createToolDataprivacyRequestAction = async (
  input: NewToolDataprivacyRequestParams,
) => {
  try {
    const payload = insertToolDataprivacyRequestParams.parse(input);
    await createToolDataprivacyRequest(payload);
    revalidateToolDataprivacyRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyRequestAction = async (
  input: UpdateToolDataprivacyRequestParams,
) => {
  try {
    const payload = updateToolDataprivacyRequestParams.parse(input);
    await updateToolDataprivacyRequest(payload.id, payload);
    revalidateToolDataprivacyRequests();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyRequestAction = async (
  input: ToolDataprivacyRequestId,
) => {
  try {
    const payload = toolDataprivacyRequestIdSchema.parse({ id: input });
    await deleteToolDataprivacyRequest(payload.id);
    revalidateToolDataprivacyRequests();
  } catch (e) {
    return handleErrors(e);
  }
};
