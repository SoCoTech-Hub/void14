import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type ScormSeqRuleCondId, 
  type NewScormSeqRuleCondParams,
  type UpdateScormSeqRuleCondParams, 
  updateScormSeqRuleCondSchema,
  insertScormSeqRuleCondSchema, 
  scormSeqRuleConds,
  scormSeqRuleCondIdSchema 
} from "@/lib/db/schema/scormSeqRuleConds";

export const createScormSeqRuleCond = async (scormSeqRuleCond: NewScormSeqRuleCondParams) => {
  const newScormSeqRuleCond = insertScormSeqRuleCondSchema.parse(scormSeqRuleCond);
  try {
    const [s] =  await db.insert(scormSeqRuleConds).values(newScormSeqRuleCond).returning();
    return { scormSeqRuleCond: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormSeqRuleCond = async (id: ScormSeqRuleCondId, scormSeqRuleCond: UpdateScormSeqRuleCondParams) => {
  const { id: scormSeqRuleCondId } = scormSeqRuleCondIdSchema.parse({ id });
  const newScormSeqRuleCond = updateScormSeqRuleCondSchema.parse(scormSeqRuleCond);
  try {
    const [s] =  await db
     .update(scormSeqRuleConds)
     .set(newScormSeqRuleCond)
     .where(eq(scormSeqRuleConds.id, scormSeqRuleCondId!))
     .returning();
    return { scormSeqRuleCond: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormSeqRuleCond = async (id: ScormSeqRuleCondId) => {
  const { id: scormSeqRuleCondId } = scormSeqRuleCondIdSchema.parse({ id });
  try {
    const [s] =  await db.delete(scormSeqRuleConds).where(eq(scormSeqRuleConds.id, scormSeqRuleCondId!))
    .returning();
    return { scormSeqRuleCond: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

