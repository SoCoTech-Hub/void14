"use server";

import { revalidatePath } from "next/cache";
import {
  createToolDataprivacyCtxExpired,
  deleteToolDataprivacyCtxExpired,
  updateToolDataprivacyCtxExpired,
} from "@/lib/api/toolDataprivacyCtxExpireds/mutations";
import {
  ToolDataprivacyCtxExpiredId,
  NewToolDataprivacyCtxExpiredParams,
  UpdateToolDataprivacyCtxExpiredParams,
  toolDataprivacyCtxExpiredIdSchema,
  insertToolDataprivacyCtxExpiredParams,
  updateToolDataprivacyCtxExpiredParams,
} from "@/lib/db/schema/toolDataprivacyCtxExpireds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyCtxExpireds = () => revalidatePath("/tool-dataprivacy-ctx-expireds");

export const createToolDataprivacyCtxExpiredAction = async (input: NewToolDataprivacyCtxExpiredParams) => {
  try {
    const payload = insertToolDataprivacyCtxExpiredParams.parse(input);
    await createToolDataprivacyCtxExpired(payload);
    revalidateToolDataprivacyCtxExpireds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyCtxExpiredAction = async (input: UpdateToolDataprivacyCtxExpiredParams) => {
  try {
    const payload = updateToolDataprivacyCtxExpiredParams.parse(input);
    await updateToolDataprivacyCtxExpired(payload.id, payload);
    revalidateToolDataprivacyCtxExpireds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyCtxExpiredAction = async (input: ToolDataprivacyCtxExpiredId) => {
  try {
    const payload = toolDataprivacyCtxExpiredIdSchema.parse({ id: input });
    await deleteToolDataprivacyCtxExpired(payload.id);
    revalidateToolDataprivacyCtxExpireds();
  } catch (e) {
    return handleErrors(e);
  }
};
