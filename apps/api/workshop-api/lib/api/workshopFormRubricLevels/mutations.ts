import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertWorkshopFormRubricLevelSchema,
  NewWorkshopFormRubricLevelParams,
  UpdateWorkshopFormRubricLevelParams,
  updateWorkshopFormRubricLevelSchema,
  WorkshopFormRubricLevelId,
  workshopFormRubricLevelIdSchema,
  workshopFormRubricLevels,
} from "../../db/schema/workshopFormRubricLevels";

export const createWorkshopFormRubricLevel = async (
  workshopFormRubricLevel: NewWorkshopFormRubricLevelParams,
) => {
  const newWorkshopFormRubricLevel = insertWorkshopFormRubricLevelSchema.parse(
    workshopFormRubricLevel,
  );
  try {
    const [w] = await db
      .insert(workshopFormRubricLevels)
      .values(newWorkshopFormRubricLevel)
      .returning();
    return { workshopFormRubricLevel: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormRubricLevel = async (
  id: WorkshopFormRubricLevelId,
  workshopFormRubricLevel: UpdateWorkshopFormRubricLevelParams,
) => {
  const { id: workshopFormRubricLevelId } =
    workshopFormRubricLevelIdSchema.parse({ id });
  const newWorkshopFormRubricLevel = updateWorkshopFormRubricLevelSchema.parse(
    workshopFormRubricLevel,
  );
  try {
    const [w] = await db
      .update(workshopFormRubricLevels)
      .set(newWorkshopFormRubricLevel)
      .where(eq(workshopFormRubricLevels.id, workshopFormRubricLevelId!))
      .returning();
    return { workshopFormRubricLevel: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormRubricLevel = async (
  id: WorkshopFormRubricLevelId,
) => {
  const { id: workshopFormRubricLevelId } =
    workshopFormRubricLevelIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(workshopFormRubricLevels)
      .where(eq(workshopFormRubricLevels.id, workshopFormRubricLevelId!))
      .returning();
    return { workshopFormRubricLevel: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
