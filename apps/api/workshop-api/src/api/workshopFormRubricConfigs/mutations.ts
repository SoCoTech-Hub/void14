import type {
  NewWorkshopFormRubricConfigParams,
  UpdateWorkshopFormRubricConfigParams,
  WorkshopFormRubricConfigId,
} from "@soco/workshop-db/schema/workshopFormRubricConfigs";
import { eq } from "@soco/workshop-db";
import { db } from "@soco/workshop-db/client";
import {
  insertWorkshopFormRubricConfigSchema,
  updateWorkshopFormRubricConfigSchema,
  workshopFormRubricConfigIdSchema,
  workshopFormRubricConfigs,
} from "@soco/workshop-db/schema/workshopFormRubricConfigs";

export const createWorkshopFormRubricConfig = async (
  workshopFormRubricConfig: NewWorkshopFormRubricConfigParams,
) => {
  const newWorkshopFormRubricConfig =
    insertWorkshopFormRubricConfigSchema.parse(workshopFormRubricConfig);
  try {
    const [w] = await db
      .insert(workshopFormRubricConfigs)
      .values(newWorkshopFormRubricConfig)
      .returning();
    return { workshopFormRubricConfig: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormRubricConfig = async (
  id: WorkshopFormRubricConfigId,
  workshopFormRubricConfig: UpdateWorkshopFormRubricConfigParams,
) => {
  const { id: workshopFormRubricConfigId } =
    workshopFormRubricConfigIdSchema.parse({ id });
  const newWorkshopFormRubricConfig =
    updateWorkshopFormRubricConfigSchema.parse(workshopFormRubricConfig);
  try {
    const [w] = await db
      .update(workshopFormRubricConfigs)
      .set(newWorkshopFormRubricConfig)
      .where(eq(workshopFormRubricConfigs.id, workshopFormRubricConfigId!))
      .returning();
    return { workshopFormRubricConfig: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormRubricConfig = async (
  id: WorkshopFormRubricConfigId,
) => {
  const { id: workshopFormRubricConfigId } =
    workshopFormRubricConfigIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(workshopFormRubricConfigs)
      .where(eq(workshopFormRubricConfigs.id, workshopFormRubricConfigId!))
      .returning();
    return { workshopFormRubricConfig: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
