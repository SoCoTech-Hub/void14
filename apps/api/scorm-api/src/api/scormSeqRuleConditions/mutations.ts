import { db } from "@soco/scorm-db/client";
import { eq } from "@soco/scorm-db";
import { 
  type ScormSeqRuleConditionId, 
  type NewScormSeqRuleConditionParams,
  type UpdateScormSeqRuleConditionParams, 
  updateScormSeqRuleConditionSchema,
  insertScormSeqRuleConditionSchema, 
  scormSeqRuleConditions,
  scormSeqRuleConditionIdSchema 
} from "@soco/scorm-db/schema/scormSeqRuleConditions";

export const createScormSeqRuleCondition = async (scormSeqRuleCondition: NewScormSeqRuleConditionParams) => {
  const newScormSeqRuleCondition = insertScormSeqRuleConditionSchema.parse(scormSeqRuleCondition);
  try {
    const [s] =  await db.insert(scormSeqRuleConditions).values(newScormSeqRuleCondition).returning();
    return { scormSeqRuleCondition: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormSeqRuleCondition = async (id: ScormSeqRuleConditionId, scormSeqRuleCondition: UpdateScormSeqRuleConditionParams) => {
  const { id: scormSeqRuleConditionId } = scormSeqRuleConditionIdSchema.parse({ id });
  const newScormSeqRuleCondition = updateScormSeqRuleConditionSchema.parse(scormSeqRuleCondition);
  try {
    const [s] =  await db
     .update(scormSeqRuleConditions)
     .set(newScormSeqRuleCondition)
     .where(eq(scormSeqRuleConditions.id, scormSeqRuleConditionId!))
     .returning();
    return { scormSeqRuleCondition: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormSeqRuleCondition = async (id: ScormSeqRuleConditionId) => {
  const { id: scormSeqRuleConditionId } = scormSeqRuleConditionIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scormSeqRuleConditions).where(eq(scormSeqRuleConditions.id, scormSeqRuleConditionId!))
    .returning();
    return { scormSeqRuleCondition: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

