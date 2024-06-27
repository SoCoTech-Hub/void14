"use server";

import { revalidatePath } from "next/cache";
import {
  createToolPolicy,
  deleteToolPolicy,
  updateToolPolicy,
} from "@/lib/api/toolPolicies/mutations";
import {
  ToolPolicyId,
  NewToolPolicyParams,
  UpdateToolPolicyParams,
  toolPolicyIdSchema,
  insertToolPolicyParams,
  updateToolPolicyParams,
} from "@/lib/db/schema/toolPolicies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolPolicies = () => revalidatePath("/tool-policies");

export const createToolPolicyAction = async (input: NewToolPolicyParams) => {
  try {
    const payload = insertToolPolicyParams.parse(input);
    await createToolPolicy(payload);
    revalidateToolPolicies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolPolicyAction = async (input: UpdateToolPolicyParams) => {
  try {
    const payload = updateToolPolicyParams.parse(input);
    await updateToolPolicy(payload.id, payload);
    revalidateToolPolicies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolPolicyAction = async (input: ToolPolicyId) => {
  try {
    const payload = toolPolicyIdSchema.parse({ id: input });
    await deleteToolPolicy(payload.id);
    revalidateToolPolicies();
  } catch (e) {
    return handleErrors(e);
  }
};