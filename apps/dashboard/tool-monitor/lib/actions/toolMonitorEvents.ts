"use server";

import { revalidatePath } from "next/cache";
import {
  createToolMonitorEvent,
  deleteToolMonitorEvent,
  updateToolMonitorEvent,
} from "@/lib/api/toolMonitorEvents/mutations";
import {
  ToolMonitorEventId,
  NewToolMonitorEventParams,
  UpdateToolMonitorEventParams,
  toolMonitorEventIdSchema,
  insertToolMonitorEventParams,
  updateToolMonitorEventParams,
} from "@/lib/db/schema/toolMonitorEvents";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolMonitorEvents = () => revalidatePath("/tool-monitor-events");

export const createToolMonitorEventAction = async (input: NewToolMonitorEventParams) => {
  try {
    const payload = insertToolMonitorEventParams.parse(input);
    await createToolMonitorEvent(payload);
    revalidateToolMonitorEvents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolMonitorEventAction = async (input: UpdateToolMonitorEventParams) => {
  try {
    const payload = updateToolMonitorEventParams.parse(input);
    await updateToolMonitorEvent(payload.id, payload);
    revalidateToolMonitorEvents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolMonitorEventAction = async (input: ToolMonitorEventId) => {
  try {
    const payload = toolMonitorEventIdSchema.parse({ id: input });
    await deleteToolMonitorEvent(payload.id);
    revalidateToolMonitorEvents();
  } catch (e) {
    return handleErrors(e);
  }
};
