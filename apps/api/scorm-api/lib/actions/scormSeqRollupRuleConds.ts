"use server";

import { revalidatePath } from "next/cache";

import {
  createScormSeqRollupRuleCond,
  deleteScormSeqRollupRuleCond,
  updateScormSeqRollupRuleCond,
} from "../api/scormSeqRollupRuleConds/mutations";
import {
  insertScormSeqRollupRuleCondParams,
  NewScormSeqRollupRuleCondParams,
  ScormSeqRollupRuleCondId,
  scormSeqRollupRuleCondIdSchema,
  UpdateScormSeqRollupRuleCondParams,
  updateScormSeqRollupRuleCondParams,
} from "../db/schema/scormSeqRollupRuleConds";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormSeqRollupRuleConds = () =>
  revalidatePath("/scorm-seq-rollup-rule-conds");

export const createScormSeqRollupRuleCondAction = async (
  input: NewScormSeqRollupRuleCondParams,
) => {
  try {
    const payload = insertScormSeqRollupRuleCondParams.parse(input);
    await createScormSeqRollupRuleCond(payload);
    revalidateScormSeqRollupRuleConds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormSeqRollupRuleCondAction = async (
  input: UpdateScormSeqRollupRuleCondParams,
) => {
  try {
    const payload = updateScormSeqRollupRuleCondParams.parse(input);
    await updateScormSeqRollupRuleCond(payload.id, payload);
    revalidateScormSeqRollupRuleConds();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormSeqRollupRuleCondAction = async (
  input: ScormSeqRollupRuleCondId,
) => {
  try {
    const payload = scormSeqRollupRuleCondIdSchema.parse({ id: input });
    await deleteScormSeqRollupRuleCond(payload.id);
    revalidateScormSeqRollupRuleConds();
  } catch (e) {
    return handleErrors(e);
  }
};
