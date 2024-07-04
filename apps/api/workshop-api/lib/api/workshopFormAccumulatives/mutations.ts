import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertWorkshopFormAccumulativeSchema,
  NewWorkshopFormAccumulativeParams,
  UpdateWorkshopFormAccumulativeParams,
  updateWorkshopFormAccumulativeSchema,
  WorkshopFormAccumulativeId,
  workshopFormAccumulativeIdSchema,
  workshopFormAccumulatives,
} from "../db/schema/workshopFormAccumulatives";

export const createWorkshopFormAccumulative = async (
  workshopFormAccumulative: NewWorkshopFormAccumulativeParams,
) => {
  const newWorkshopFormAccumulative =
    insertWorkshopFormAccumulativeSchema.parse(workshopFormAccumulative);
  try {
    const [w] = await db
      .insert(workshopFormAccumulatives)
      .values(newWorkshopFormAccumulative)
      .returning();
    return { workshopFormAccumulative: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormAccumulative = async (
  id: WorkshopFormAccumulativeId,
  workshopFormAccumulative: UpdateWorkshopFormAccumulativeParams,
) => {
  const { id: workshopFormAccumulativeId } =
    workshopFormAccumulativeIdSchema.parse({ id });
  const newWorkshopFormAccumulative =
    updateWorkshopFormAccumulativeSchema.parse(workshopFormAccumulative);
  try {
    const [w] = await db
      .update(workshopFormAccumulatives)
      .set(newWorkshopFormAccumulative)
      .where(eq(workshopFormAccumulatives.id, workshopFormAccumulativeId!))
      .returning();
    return { workshopFormAccumulative: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormAccumulative = async (
  id: WorkshopFormAccumulativeId,
) => {
  const { id: workshopFormAccumulativeId } =
    workshopFormAccumulativeIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(workshopFormAccumulatives)
      .where(eq(workshopFormAccumulatives.id, workshopFormAccumulativeId!))
      .returning();
    return { workshopFormAccumulative: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
