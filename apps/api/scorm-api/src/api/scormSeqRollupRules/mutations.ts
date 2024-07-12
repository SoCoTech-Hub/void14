import { db } from "@soco/scorm-db/client";
import { eq } from "@soco/scorm-db";
import { 
  type ScormSeqRollupRuleId, 
  type NewScormSeqRollupRuleParams,
  type UpdateScormSeqRollupRuleParams, 
  updateScormSeqRollupRuleSchema,
  insertScormSeqRollupRuleSchema, 
  scormSeqRollupRules,
  scormSeqRollupRuleIdSchema 
} from "@soco/scorm-db/schema/scormSeqRollupRules";

export const createScormSeqRollupRule = async (scormSeqRollupRule: NewScormSeqRollupRuleParams) => {
  const newScormSeqRollupRule = insertScormSeqRollupRuleSchema.parse(scormSeqRollupRule);
  try {
    const [s] =  await db.insert(scormSeqRollupRules).values(newScormSeqRollupRule).returning();
    return { scormSeqRollupRule: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormSeqRollupRule = async (id: ScormSeqRollupRuleId, scormSeqRollupRule: UpdateScormSeqRollupRuleParams) => {
  const { id: scormSeqRollupRuleId } = scormSeqRollupRuleIdSchema.parse({ id });
  const newScormSeqRollupRule = updateScormSeqRollupRuleSchema.parse(scormSeqRollupRule);
  try {
    const [s] =  await db
     .update(scormSeqRollupRules)
     .set(newScormSeqRollupRule)
     .where(eq(scormSeqRollupRules.id, scormSeqRollupRuleId!))
     .returning();
    return { scormSeqRollupRule: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormSeqRollupRule = async (id: ScormSeqRollupRuleId) => {
  const { id: scormSeqRollupRuleId } = scormSeqRollupRuleIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scormSeqRollupRules).where(eq(scormSeqRollupRules.id, scormSeqRollupRuleId!))
    .returning();
    return { scormSeqRollupRule: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

