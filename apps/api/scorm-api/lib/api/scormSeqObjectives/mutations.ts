import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertScormSeqObjectiveSchema,
  NewScormSeqObjectiveParams,
  ScormSeqObjectiveId,
  scormSeqObjectiveIdSchema,
  scormSeqObjectives,
  UpdateScormSeqObjectiveParams,
  updateScormSeqObjectiveSchema,
} from "../../db/schema/scormSeqObjectives";

export const createScormSeqObjective = async (
  scormSeqObjective: NewScormSeqObjectiveParams,
) => {
  const newScormSeqObjective =
    insertScormSeqObjectiveSchema.parse(scormSeqObjective);
  try {
    const [s] = await db
      .insert(scormSeqObjectives)
      .values(newScormSeqObjective)
      .returning();
    return { scormSeqObjective: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateScormSeqObjective = async (
  id: ScormSeqObjectiveId,
  scormSeqObjective: UpdateScormSeqObjectiveParams,
) => {
  const { id: scormSeqObjectiveId } = scormSeqObjectiveIdSchema.parse({ id });
  const newScormSeqObjective =
    updateScormSeqObjectiveSchema.parse(scormSeqObjective);
  try {
    const [s] = await db
      .update(scormSeqObjectives)
      .set(newScormSeqObjective)
      .where(eq(scormSeqObjectives.id, scormSeqObjectiveId!))
      .returning();
    return { scormSeqObjective: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteScormSeqObjective = async (id: ScormSeqObjectiveId) => {
  const { id: scormSeqObjectiveId } = scormSeqObjectiveIdSchema.parse({ id });
  try {
    const [s] = await db
      .delete(scormSeqObjectives)
      .where(eq(scormSeqObjectives.id, scormSeqObjectiveId!))
      .returning();
    return { scormSeqObjective: s };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
