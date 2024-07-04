import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertWorkshopFormNumErrorSchema,
  NewWorkshopFormNumErrorParams,
  UpdateWorkshopFormNumErrorParams,
  updateWorkshopFormNumErrorSchema,
  WorkshopFormNumErrorId,
  workshopFormNumErrorIdSchema,
  workshopFormNumErrors,
} from "../db/schema/workshopFormNumErrors";

export const createWorkshopFormNumError = async (
  workshopFormNumError: NewWorkshopFormNumErrorParams,
) => {
  const newWorkshopFormNumError =
    insertWorkshopFormNumErrorSchema.parse(workshopFormNumError);
  try {
    const [w] = await db
      .insert(workshopFormNumErrors)
      .values(newWorkshopFormNumError)
      .returning();
    return { workshopFormNumError: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormNumError = async (
  id: WorkshopFormNumErrorId,
  workshopFormNumError: UpdateWorkshopFormNumErrorParams,
) => {
  const { id: workshopFormNumErrorId } = workshopFormNumErrorIdSchema.parse({
    id,
  });
  const newWorkshopFormNumError =
    updateWorkshopFormNumErrorSchema.parse(workshopFormNumError);
  try {
    const [w] = await db
      .update(workshopFormNumErrors)
      .set(newWorkshopFormNumError)
      .where(eq(workshopFormNumErrors.id, workshopFormNumErrorId!))
      .returning();
    return { workshopFormNumError: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormNumError = async (
  id: WorkshopFormNumErrorId,
) => {
  const { id: workshopFormNumErrorId } = workshopFormNumErrorIdSchema.parse({
    id,
  });
  try {
    const [w] = await db
      .delete(workshopFormNumErrors)
      .where(eq(workshopFormNumErrors.id, workshopFormNumErrorId!))
      .returning();
    return { workshopFormNumError: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};