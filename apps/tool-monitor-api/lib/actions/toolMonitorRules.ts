"use server";

import { revalidatePath } from "next/cache";
import {
  createToolMonitorRule,
  deleteToolMonitorRule,
  updateToolMonitorRule,
} from "@/lib/api/toolMonitorRules/mutations";
import {
  ToolMonitorRuleId,
  NewToolMonitorRuleParams,
  UpdateToolMonitorRuleParams,
  toolMonitorRuleIdSchema,
  insertToolMonitorRuleParams,
  updateToolMonitorRuleParams,
} from "@/lib/db/schema/toolMonitorRules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolMonitorRules = () => revalidatePath("/tool-monitor-rules");

export const createToolMonitorRuleAction = async (input: NewToolMonitorRuleParams) => {
  try {
    const payload = insertToolMonitorRuleParams.parse(input);
    await createToolMonitorRule(payload);
    revalidateToolMonitorRules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolMonitorRuleAction = async (input: UpdateToolMonitorRuleParams) => {
  try {
    const payload = updateToolMonitorRuleParams.parse(input);
    await updateToolMonitorRule(payload.id, payload);
    revalidateToolMonitorRules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolMonitorRuleAction = async (input: ToolMonitorRuleId) => {
  try {
    const payload = toolMonitorRuleIdSchema.parse({ id: input });
    await deleteToolMonitorRule(payload.id);
    revalidateToolMonitorRules();
  } catch (e) {
    return handleErrors(e);
  }
};