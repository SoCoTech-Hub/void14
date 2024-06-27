"use server";

import { revalidatePath } from "next/cache";
import {
  createScormSeqRuleCondition,
  deleteScormSeqRuleCondition,
  updateScormSeqRuleCondition,
} from "@/lib/api/scormSeqRuleConditions/mutations";
import {
  ScormSeqRuleConditionId,
  NewScormSeqRuleConditionParams,
  UpdateScormSeqRuleConditionParams,
  scormSeqRuleConditionIdSchema,
  insertScormSeqRuleConditionParams,
  updateScormSeqRuleConditionParams,
} from "@/lib/db/schema/scormSeqRuleConditions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScormSeqRuleConditions = () => revalidatePath("/scorm-seq-rule-conditions");

export const createScormSeqRuleConditionAction = async (input: NewScormSeqRuleConditionParams) => {
  try {
    const payload = insertScormSeqRuleConditionParams.parse(input);
    await createScormSeqRuleCondition(payload);
    revalidateScormSeqRuleConditions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormSeqRuleConditionAction = async (input: UpdateScormSeqRuleConditionParams) => {
  try {
    const payload = updateScormSeqRuleConditionParams.parse(input);
    await updateScormSeqRuleCondition(payload.id, payload);
    revalidateScormSeqRuleConditions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormSeqRuleConditionAction = async (input: ScormSeqRuleConditionId) => {
  try {
    const payload = scormSeqRuleConditionIdSchema.parse({ id: input });
    await deleteScormSeqRuleCondition(payload.id);
    revalidateScormSeqRuleConditions();
  } catch (e) {
    return handleErrors(e);
  }
};