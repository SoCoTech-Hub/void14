"use server";

import { revalidatePath } from "next/cache";
import {
  createToolDataprivacyCtxInstance,
  deleteToolDataprivacyCtxInstance,
  updateToolDataprivacyCtxInstance,
} from "@/lib/api/toolDataprivacyCtxInstances/mutations";
import {
  ToolDataprivacyCtxInstanceId,
  NewToolDataprivacyCtxInstanceParams,
  UpdateToolDataprivacyCtxInstanceParams,
  toolDataprivacyCtxInstanceIdSchema,
  insertToolDataprivacyCtxInstanceParams,
  updateToolDataprivacyCtxInstanceParams,
} from "@/lib/db/schema/toolDataprivacyCtxInstances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyCtxInstances = () => revalidatePath("/tool-dataprivacy-ctx-instances");

export const createToolDataprivacyCtxInstanceAction = async (input: NewToolDataprivacyCtxInstanceParams) => {
  try {
    const payload = insertToolDataprivacyCtxInstanceParams.parse(input);
    await createToolDataprivacyCtxInstance(payload);
    revalidateToolDataprivacyCtxInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyCtxInstanceAction = async (input: UpdateToolDataprivacyCtxInstanceParams) => {
  try {
    const payload = updateToolDataprivacyCtxInstanceParams.parse(input);
    await updateToolDataprivacyCtxInstance(payload.id, payload);
    revalidateToolDataprivacyCtxInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyCtxInstanceAction = async (input: ToolDataprivacyCtxInstanceId) => {
  try {
    const payload = toolDataprivacyCtxInstanceIdSchema.parse({ id: input });
    await deleteToolDataprivacyCtxInstance(payload.id);
    revalidateToolDataprivacyCtxInstances();
  } catch (e) {
    return handleErrors(e);
  }
};
