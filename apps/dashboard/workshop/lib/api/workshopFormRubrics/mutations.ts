import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  type WorkshopFormRubricId, 
  type NewWorkshopFormRubricParams,
  type UpdateWorkshopFormRubricParams, 
  updateWorkshopFormRubricSchema,
  insertWorkshopFormRubricSchema, 
  workshopFormRubrics,
  workshopFormRubricIdSchema 
} from "@/lib/db/schema/workshopFormRubrics";
import { getUserAuth } from "@/lib/auth/utils";

export const createWorkshopFormRubric = async (workshopFormRubric: NewWorkshopFormRubricParams) => {
  const { session } = await getUserAuth();
  const newWorkshopFormRubric = insertWorkshopFormRubricSchema.parse({ ...workshopFormRubric, userId: session?.user.id! });
  try {
    const [w] =  await db.insert(workshopFormRubrics).values(newWorkshopFormRubric).returning();
    return { workshopFormRubric: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormRubric = async (id: WorkshopFormRubricId, workshopFormRubric: UpdateWorkshopFormRubricParams) => {
  const { session } = await getUserAuth();
  const { id: workshopFormRubricId } = workshopFormRubricIdSchema.parse({ id });
  const newWorkshopFormRubric = updateWorkshopFormRubricSchema.parse({ ...workshopFormRubric, userId: session?.user.id! });
  try {
    const [w] =  await db
     .update(workshopFormRubrics)
     .set({...newWorkshopFormRubric, updatedAt: new Date() })
     .where(and(eq(workshopFormRubrics.id, workshopFormRubricId!), eq(workshopFormRubrics.userId, session?.user.id!)))
     .returning();
    return { workshopFormRubric: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormRubric = async (id: WorkshopFormRubricId) => {
  const { session } = await getUserAuth();
  const { id: workshopFormRubricId } = workshopFormRubricIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(workshopFormRubrics).where(and(eq(workshopFormRubrics.id, workshopFormRubricId!), eq(workshopFormRubrics.userId, session?.user.id!)))
    .returning();
    return { workshopFormRubric: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

