import type {
  NewWorkshopParams,
  UpdateWorkshopParams,
  WorkshopId,
} from "@soco/workshop-db/schema/workshops";
import { eq } from "@soco/workshop-db";
import { db } from "@soco/workshop-db/client";
import {
  insertWorkshopSchema,
  updateWorkshopSchema,
  workshopIdSchema,
  workshops,
} from "@soco/workshop-db/schema/workshops";

export const createWorkshop = async (workshop: NewWorkshopParams) => {
  const newWorkshop = insertWorkshopSchema.parse(workshop);
  try {
    const [w] = await db.insert(workshops).values(newWorkshop).returning();
    return { workshop: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshop = async (
  id: WorkshopId,
  workshop: UpdateWorkshopParams,
) => {
  const { id: workshopId } = workshopIdSchema.parse({ id });
  const newWorkshop = updateWorkshopSchema.parse(workshop);
  try {
    const [w] = await db
      .update(workshops)
      .set({ ...newWorkshop, updatedAt: new Date() })
      .where(eq(workshops.id, workshopId!))
      .returning();
    return { workshop: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshop = async (id: WorkshopId) => {
  const { id: workshopId } = workshopIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(workshops)
      .where(eq(workshops.id, workshopId!))
      .returning();
    return { workshop: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
