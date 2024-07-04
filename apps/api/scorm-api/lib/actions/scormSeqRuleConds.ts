"use server";

import { revalidatePath } from "next/cache";

import {
  createScormSeqRuleCond,
  deleteScormSeqRuleCond,
  updateScormSeqRuleCond,
} from "../api/scormSeqRuleConds/mutations";
import {
  insertScormSeqRuleCondParams,
  NewScormSeqRuleCondParams,
  ScormSeqRuleCondId,
  scormSeqRuleCondIdSchema,
  UpdateScormSeqRuleCondParams,
  updateScormSeqRuleCondParams,
} from "../db/schema/scormSeqRuleConds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormSeqRuleConds = () =>
  revalidatePath("/scorm-seq-rule-conds");

export const createScormSeqRuleCondAction = async (
  input: NewScormSeqRuleCondParams,
) => {
  try {
    const payload = insertScormSeqRuleCondParams.parse(input);
    await createScormSeqRuleCond(payload);
    revalidateScormSeqRuleConds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormSeqRuleCondAction = async (
  input: UpdateScormSeqRuleCondParams,
) => {
  try {
    const payload = updateScormSeqRuleCondParams.parse(input);
    await updateScormSeqRuleCond(payload.id, payload);
    revalidateScormSeqRuleConds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormSeqRuleCondAction = async (
  input: ScormSeqRuleCondId,
) => {
  try {
    const payload = scormSeqRuleCondIdSchema.parse({ id: input });
    await deleteScormSeqRuleCond(payload.id);
    revalidateScormSeqRuleConds();
  } catch (e) {
    return handleErrors(e);
  }
};
