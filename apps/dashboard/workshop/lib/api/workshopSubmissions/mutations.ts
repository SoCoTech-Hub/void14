import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type WorkshopSubmissionId, 
  type NewWorkshopSubmissionParams,
  type UpdateWorkshopSubmissionParams, 
  updateWorkshopSubmissionSchema,
  insertWorkshopSubmissionSchema, 
  workshopSubmissions,
  workshopSubmissionIdSchema 
} from "@/lib/db/schema/workshopSubmissions";
import { getUserAuth } from "@/lib/auth/utils";

export const createWorkshopSubmission = async (workshopSubmission: NewWorkshopSubmissionParams) => {
  const { session } = await getUserAuth();
  const newWorkshopSubmission = insertWorkshopSubmissionSchema.parse({ ...workshopSubmission, userId: session?.user.id! });
  try {
    const [w] =  await db.insert(workshopSubmissions).values(newWorkshopSubmission).returning();
    return { workshopSubmission: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopSubmission = async (id: WorkshopSubmissionId, workshopSubmission: UpdateWorkshopSubmissionParams) => {
  const { session } = await getUserAuth();
  const { id: workshopSubmissionId } = workshopSubmissionIdSchema.parse({ id });
  const newWorkshopSubmission = updateWorkshopSubmissionSchema.parse({ ...workshopSubmission, userId: session?.user.id! });
  try {
    const [w] =  await db
     .update(workshopSubmissions)
     .set({...newWorkshopSubmission, updatedAt: new Date() })
     .where(and(eq(workshopSubmissions.id, workshopSubmissionId!), eq(workshopSubmissions.userId, session?.user.id!)))
     .returning();
    return { workshopSubmission: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopSubmission = async (id: WorkshopSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: workshopSubmissionId } = workshopSubmissionIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(workshopSubmissions).where(and(eq(workshopSubmissions.id, workshopSubmissionId!), eq(workshopSubmissions.userId, session?.user.id!)))
    .returning();
    return { workshopSubmission: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

