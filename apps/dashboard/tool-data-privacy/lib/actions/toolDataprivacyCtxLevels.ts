"use server";

import { revalidatePath } from "next/cache";
import {
  createToolDataprivacyCtxLevel,
  deleteToolDataprivacyCtxLevel,
  updateToolDataprivacyCtxLevel,
} from "@/lib/api/toolDataprivacyCtxLevels/mutations";
import {
  ToolDataprivacyCtxLevelId,
  NewToolDataprivacyCtxLevelParams,
  UpdateToolDataprivacyCtxLevelParams,
  toolDataprivacyCtxLevelIdSchema,
  insertToolDataprivacyCtxLevelParams,
  updateToolDataprivacyCtxLevelParams,
} from "@/lib/db/schema/toolDataprivacyCtxLevels";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyCtxLevels = () => revalidatePath("/tool-dataprivacy-ctx-levels");

export const createToolDataprivacyCtxLevelAction = async (input: NewToolDataprivacyCtxLevelParams) => {
  try {
    const payload = insertToolDataprivacyCtxLevelParams.parse(input);
    await createToolDataprivacyCtxLevel(payload);
    revalidateToolDataprivacyCtxLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyCtxLevelAction = async (input: UpdateToolDataprivacyCtxLevelParams) => {
  try {
    const payload = updateToolDataprivacyCtxLevelParams.parse(input);
    await updateToolDataprivacyCtxLevel(payload.id, payload);
    revalidateToolDataprivacyCtxLevels();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyCtxLevelAction = async (input: ToolDataprivacyCtxLevelId) => {
  try {
    const payload = toolDataprivacyCtxLevelIdSchema.parse({ id: input });
    await deleteToolDataprivacyCtxLevel(payload.id);
    revalidateToolDataprivacyCtxLevels();
  } catch (e) {
    return handleErrors(e);
  }
};
