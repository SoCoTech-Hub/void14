"use server";

import { revalidatePath } from "next/cache";
import {
  createToolPolicyVersion,
  deleteToolPolicyVersion,
  updateToolPolicyVersion,
} from "@/lib/api/toolPolicyVersions/mutations";
import {
  ToolPolicyVersionId,
  NewToolPolicyVersionParams,
  UpdateToolPolicyVersionParams,
  toolPolicyVersionIdSchema,
  insertToolPolicyVersionParams,
  updateToolPolicyVersionParams,
} from "@/lib/db/schema/toolPolicyVersions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolPolicyVersions = () => revalidatePath("/tool-policy-versions");

export const createToolPolicyVersionAction = async (input: NewToolPolicyVersionParams) => {
  try {
    const payload = insertToolPolicyVersionParams.parse(input);
    await createToolPolicyVersion(payload);
    revalidateToolPolicyVersions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolPolicyVersionAction = async (input: UpdateToolPolicyVersionParams) => {
  try {
    const payload = updateToolPolicyVersionParams.parse(input);
    await updateToolPolicyVersion(payload.id, payload);
    revalidateToolPolicyVersions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolPolicyVersionAction = async (input: ToolPolicyVersionId) => {
  try {
    const payload = toolPolicyVersionIdSchema.parse({ id: input });
    await deleteToolPolicyVersion(payload.id);
    revalidateToolPolicyVersions();
  } catch (e) {
    return handleErrors(e);
  }
};