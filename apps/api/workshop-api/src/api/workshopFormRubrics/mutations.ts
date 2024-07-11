import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/workshop-db";
import { db } from "@soco/workshop-db/client";
import {
  insertWorkshopFormRubricSchema,
  NewWorkshopFormRubricParams,
  UpdateWorkshopFormRubricParams,
  updateWorkshopFormRubricSchema,
  WorkshopFormRubricId,
  workshopFormRubricIdSchema,
  workshopFormRubrics,
} from "@soco/workshop-db/schema/workshopFormRubrics";

export const createWorkshopFormRubric = async (
  workshopFormRubric: NewWorkshopFormRubricParams,
) => {
  const { session } = await getUserAuth();
  const newWorkshopFormRubric = insertWorkshopFormRubricSchema.parse({
    ...workshopFormRubric,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .insert(workshopFormRubrics)
      .values(newWorkshopFormRubric)
      .returning();
    return { workshopFormRubric: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormRubric = async (
  id: WorkshopFormRubricId,
  workshopFormRubric: UpdateWorkshopFormRubricParams,
) => {
  const { session } = await getUserAuth();
  const { id: workshopFormRubricId } = workshopFormRubricIdSchema.parse({ id });
  const newWorkshopFormRubric = updateWorkshopFormRubricSchema.parse({
    ...workshopFormRubric,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .update(workshopFormRubrics)
      .set({ ...newWorkshopFormRubric, updatedAt: new Date() })
      .where(
        and(
          eq(workshopFormRubrics.id, workshopFormRubricId!),
          eq(workshopFormRubrics.userId, session?.user.id!),
        ),
      )
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
    const [w] = await db
      .delete(workshopFormRubrics)
      .where(
        and(
          eq(workshopFormRubrics.id, workshopFormRubricId!),
          eq(workshopFormRubrics.userId, session?.user.id!),
        ),
      )
      .returning();
    return { workshopFormRubric: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
