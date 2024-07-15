"use server";

import { revalidatePath } from "next/cache";
import {
  createToolMonitorSubscription,
  deleteToolMonitorSubscription,
  updateToolMonitorSubscription,
} from "@/lib/api/toolMonitorSubscriptions/mutations";
import {
  ToolMonitorSubscriptionId,
  NewToolMonitorSubscriptionParams,
  UpdateToolMonitorSubscriptionParams,
  toolMonitorSubscriptionIdSchema,
  insertToolMonitorSubscriptionParams,
  updateToolMonitorSubscriptionParams,
} from "@/lib/db/schema/toolMonitorSubscriptions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolMonitorSubscriptions = () => revalidatePath("/tool-monitor-subscriptions");

export const createToolMonitorSubscriptionAction = async (input: NewToolMonitorSubscriptionParams) => {
  try {
    const payload = insertToolMonitorSubscriptionParams.parse(input);
    await createToolMonitorSubscription(payload);
    revalidateToolMonitorSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolMonitorSubscriptionAction = async (input: UpdateToolMonitorSubscriptionParams) => {
  try {
    const payload = updateToolMonitorSubscriptionParams.parse(input);
    await updateToolMonitorSubscription(payload.id, payload);
    revalidateToolMonitorSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolMonitorSubscriptionAction = async (input: ToolMonitorSubscriptionId) => {
  try {
    const payload = toolMonitorSubscriptionIdSchema.parse({ id: input });
    await deleteToolMonitorSubscription(payload.id);
    revalidateToolMonitorSubscriptions();
  } catch (e) {
    return handleErrors(e);
  }
};
