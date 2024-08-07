import type {
  NewScormSeqRollupRuleCondParams,
  ScormSeqRollupRuleCondId,
  UpdateScormSeqRollupRuleCondParams,
} from "@soco/scorm-db/schema/scormSeqRollupRuleConds";
import { eq } from "@soco/scorm-db";
import { db } from "@soco/scorm-db/client";
import {
  insertScormSeqRollupRuleCondSchema,
  scormSeqRollupRuleCondIdSchema,
  scormSeqRollupRuleConds,
  updateScormSeqRollupRuleCondSchema,
} from "@soco/scorm-db/schema/scormSeqRollupRuleConds";

export const createScormSeqRollupRuleCond = async (
  scormSeqRollupRuleCond: NewScormSeqRollupRuleCondParams,
) => {
  const newScormSeqRollupRuleCond = insertScormSeqRollupRuleCondSchema.parse(
    scormSeqRollupRuleCond,
  );
  try {
    const [s] = await db
      .insert(scormSeqRollupRuleConds)
      .values(newScormSeqRollupRuleCond)
      .returning();
    return { scormSeqRollupRuleCond: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormSeqRollupRuleCond = async (
  id: ScormSeqRollupRuleCondId,
  scormSeqRollupRuleCond: UpdateScormSeqRollupRuleCondParams,
) => {
  const { id: scormSeqRollupRuleCondId } = scormSeqRollupRuleCondIdSchema.parse(
    { id },
  );
  const newScormSeqRollupRuleCond = updateScormSeqRollupRuleCondSchema.parse(
    scormSeqRollupRuleCond,
  );
  try {
    const [s] = await db
      .update(scormSeqRollupRuleConds)
      .set(newScormSeqRollupRuleCond)
      .where(eq(scormSeqRollupRuleConds.id, scormSeqRollupRuleCondId!))
      .returning();
    return { scormSeqRollupRuleCond: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormSeqRollupRuleCond = async (
  id: ScormSeqRollupRuleCondId,
) => {
  const { id: scormSeqRollupRuleCondId } = scormSeqRollupRuleCondIdSchema.parse(
    { id },
  );
  try {
    const [s] = await db
      .delete(scormSeqRollupRuleConds)
      .where(eq(scormSeqRollupRuleConds.id, scormSeqRollupRuleCondId!))
      .returning();
    return { scormSeqRollupRuleCond: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
