import { db } from "@soco/workshop-db/client";
import { eq } from "@soco/workshop-db";
import { 
  type WorkshopAllocationScheduleId, 
  type NewWorkshopAllocationScheduleParams,
  type UpdateWorkshopAllocationScheduleParams, 
  updateWorkshopAllocationScheduleSchema,
  insertWorkshopAllocationScheduleSchema, 
  workshopAllocationSchedules,
  workshopAllocationScheduleIdSchema 
} from "@soco/workshop-db/schema/workshopAllocationSchedules";

export const createWorkshopAllocationSchedule = async (workshopAllocationSchedule: NewWorkshopAllocationScheduleParams) => {
  const newWorkshopAllocationSchedule = insertWorkshopAllocationScheduleSchema.parse(workshopAllocationSchedule);
  try {
    const [w] =  await db.insert(workshopAllocationSchedules).values(newWorkshopAllocationSchedule).returning();
    return { workshopAllocationSchedule: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopAllocationSchedule = async (id: WorkshopAllocationScheduleId, workshopAllocationSchedule: UpdateWorkshopAllocationScheduleParams) => {
  const { id: workshopAllocationScheduleId } = workshopAllocationScheduleIdSchema.parse({ id });
  const newWorkshopAllocationSchedule = updateWorkshopAllocationScheduleSchema.parse(workshopAllocationSchedule);
  try {
    const [w] =  await db
     .update(workshopAllocationSchedules)
     .set({...newWorkshopAllocationSchedule, updatedAt: new Date() })
     .where(eq(workshopAllocationSchedules.id, workshopAllocationScheduleId!))
     .returning();
    return { workshopAllocationSchedule: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopAllocationSchedule = async (id: WorkshopAllocationScheduleId) => {
  const { id: workshopAllocationScheduleId } = workshopAllocationScheduleIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(workshopAllocationSchedules).where(eq(workshopAllocationSchedules.id, workshopAllocationScheduleId!))
    .returning();
    return { workshopAllocationSchedule: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

