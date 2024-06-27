"use server";

import { revalidatePath } from "next/cache";
import {
  createToolMonitorHistory,
  deleteToolMonitorHistory,
  updateToolMonitorHistory,
} from "@/lib/api/toolMonitorHistories/mutations";
import {
  ToolMonitorHistoryId,
  NewToolMonitorHistoryParams,
  UpdateToolMonitorHistoryParams,
  toolMonitorHistoryIdSchema,
  insertToolMonitorHistoryParams,
  updateToolMonitorHistoryParams,
} from "@/lib/db/schema/toolMonitorHistories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolMonitorHistories = () => revalidatePath("/tool-monitor-histories");

export const createToolMonitorHistoryAction = async (input: NewToolMonitorHistoryParams) => {
  try {
    const payload = insertToolMonitorHistoryParams.parse(input);
    await createToolMonitorHistory(payload);
    revalidateToolMonitorHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolMonitorHistoryAction = async (input: UpdateToolMonitorHistoryParams) => {
  try {
    const payload = updateToolMonitorHistoryParams.parse(input);
    await updateToolMonitorHistory(payload.id, payload);
    revalidateToolMonitorHistories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolMonitorHistoryAction = async (input: ToolMonitorHistoryId) => {
  try {
    const payload = toolMonitorHistoryIdSchema.parse({ id: input });
    await deleteToolMonitorHistory(payload.id);
    revalidateToolMonitorHistories();
  } catch (e) {
    return handleErrors(e);
  }
};