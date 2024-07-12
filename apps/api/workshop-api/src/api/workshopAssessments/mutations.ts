import { db } from "@soco/workshop-db/client";
import { eq } from "@soco/workshop-db";
import { 
  type WorkshopAssessmentId, 
  type NewWorkshopAssessmentParams,
  type UpdateWorkshopAssessmentParams, 
  updateWorkshopAssessmentSchema,
  insertWorkshopAssessmentSchema, 
  workshopAssessments,
  workshopAssessmentIdSchema 
} from "@soco/workshop-db/schema/workshopAssessments";

export const createWorkshopAssessment = async (workshopAssessment: NewWorkshopAssessmentParams) => {
  const newWorkshopAssessment = insertWorkshopAssessmentSchema.parse(workshopAssessment);
  try {
    const [w] =  await db.insert(workshopAssessments).values(newWorkshopAssessment).returning();
    return { workshopAssessment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopAssessment = async (id: WorkshopAssessmentId, workshopAssessment: UpdateWorkshopAssessmentParams) => {
  const { id: workshopAssessmentId } = workshopAssessmentIdSchema.parse({ id });
  const newWorkshopAssessment = updateWorkshopAssessmentSchema.parse(workshopAssessment);
  try {
    const [w] =  await db
     .update(workshopAssessments)
     .set({...newWorkshopAssessment, updatedAt: new Date() })
     .where(eq(workshopAssessments.id, workshopAssessmentId!))
     .returning();
    return { workshopAssessment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopAssessment = async (id: WorkshopAssessmentId) => {
  const { id: workshopAssessmentId } = workshopAssessmentIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(workshopAssessments).where(eq(workshopAssessments.id, workshopAssessmentId!))
    .returning();
    return { workshopAssessment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

