import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertWorkshopFormNumErrorMapSchema,
  NewWorkshopFormNumErrorMapParams,
  UpdateWorkshopFormNumErrorMapParams,
  updateWorkshopFormNumErrorMapSchema,
  WorkshopFormNumErrorMapId,
  workshopFormNumErrorMapIdSchema,
  workshopFormNumErrorMaps,
} from "../db/schema/workshopFormNumErrorMaps";

export const createWorkshopFormNumErrorMap = async (
  workshopFormNumErrorMap: NewWorkshopFormNumErrorMapParams,
) => {
  const newWorkshopFormNumErrorMap = insertWorkshopFormNumErrorMapSchema.parse(
    workshopFormNumErrorMap,
  );
  try {
    const [w] = await db
      .insert(workshopFormNumErrorMaps)
      .values(newWorkshopFormNumErrorMap)
      .returning();
    return { workshopFormNumErrorMap: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormNumErrorMap = async (
  id: WorkshopFormNumErrorMapId,
  workshopFormNumErrorMap: UpdateWorkshopFormNumErrorMapParams,
) => {
  const { id: workshopFormNumErrorMapId } =
    workshopFormNumErrorMapIdSchema.parse({ id });
  const newWorkshopFormNumErrorMap = updateWorkshopFormNumErrorMapSchema.parse(
    workshopFormNumErrorMap,
  );
  try {
    const [w] = await db
      .update(workshopFormNumErrorMaps)
      .set(newWorkshopFormNumErrorMap)
      .where(eq(workshopFormNumErrorMaps.id, workshopFormNumErrorMapId!))
      .returning();
    return { workshopFormNumErrorMap: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormNumErrorMap = async (
  id: WorkshopFormNumErrorMapId,
) => {
  const { id: workshopFormNumErrorMapId } =
    workshopFormNumErrorMapIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(workshopFormNumErrorMaps)
      .where(eq(workshopFormNumErrorMaps.id, workshopFormNumErrorMapId!))
      .returning();
    return { workshopFormNumErrorMap: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
