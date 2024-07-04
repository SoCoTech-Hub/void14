"use server";

import { revalidatePath } from "next/cache";

import {
  createScormSeqRollupRule,
  deleteScormSeqRollupRule,
  updateScormSeqRollupRule,
} from "../api/scormSeqRollupRules/mutations";
import {
  insertScormSeqRollupRuleParams,
  NewScormSeqRollupRuleParams,
  ScormSeqRollupRuleId,
  scormSeqRollupRuleIdSchema,
  UpdateScormSeqRollupRuleParams,
  updateScormSeqRollupRuleParams,
} from "../db/schema/scormSeqRollupRules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormSeqRollupRules = () =>
  revalidatePath("/scorm-seq-rollup-rules");

export const createScormSeqRollupRuleAction = async (
  input: NewScormSeqRollupRuleParams,
) => {
  try {
    const payload = insertScormSeqRollupRuleParams.parse(input);
    await createScormSeqRollupRule(payload);
    revalidateScormSeqRollupRules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormSeqRollupRuleAction = async (
  input: UpdateScormSeqRollupRuleParams,
) => {
  try {
    const payload = updateScormSeqRollupRuleParams.parse(input);
    await updateScormSeqRollupRule(payload.id, payload);
    revalidateScormSeqRollupRules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormSeqRollupRuleAction = async (
  input: ScormSeqRollupRuleId,
) => {
  try {
    const payload = scormSeqRollupRuleIdSchema.parse({ id: input });
    await deleteScormSeqRollupRule(payload.id);
    revalidateScormSeqRollupRules();
  } catch (e) {
    return handleErrors(e);
  }
};
