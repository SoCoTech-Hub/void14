"use server";

import { revalidatePath } from "next/cache";
import {
  createToolPolicyAcceptance,
  deleteToolPolicyAcceptance,
  updateToolPolicyAcceptance,
} from "@/lib/api/toolPolicyAcceptances/mutations";
import {
  ToolPolicyAcceptanceId,
  NewToolPolicyAcceptanceParams,
  UpdateToolPolicyAcceptanceParams,
  toolPolicyAcceptanceIdSchema,
  insertToolPolicyAcceptanceParams,
  updateToolPolicyAcceptanceParams,
} from "@/lib/db/schema/toolPolicyAcceptances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolPolicyAcceptances = () => revalidatePath("/tool-policy-acceptances");

export const createToolPolicyAcceptanceAction = async (input: NewToolPolicyAcceptanceParams) => {
  try {
    const payload = insertToolPolicyAcceptanceParams.parse(input);
    await createToolPolicyAcceptance(payload);
    revalidateToolPolicyAcceptances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolPolicyAcceptanceAction = async (input: UpdateToolPolicyAcceptanceParams) => {
  try {
    const payload = updateToolPolicyAcceptanceParams.parse(input);
    await updateToolPolicyAcceptance(payload.id, payload);
    revalidateToolPolicyAcceptances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolPolicyAcceptanceAction = async (input: ToolPolicyAcceptanceId) => {
  try {
    const payload = toolPolicyAcceptanceIdSchema.parse({ id: input });
    await deleteToolPolicyAcceptance(payload.id);
    revalidateToolPolicyAcceptances();
  } catch (e) {
    return handleErrors(e);
  }
};
