import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/workshop-db/index";
import {
  insertWorkshopGradeSchema,
  NewWorkshopGradeParams,
  UpdateWorkshopGradeParams,
  updateWorkshopGradeSchema,
  WorkshopGradeId,
  workshopGradeIdSchema,
  workshopGrades,
} from "@soco/workshop-db/schema/workshopGrades";

export const createWorkshopGrade = async (
  workshopGrade: NewWorkshopGradeParams,
) => {
  const { session } = await getUserAuth();
  const newWorkshopGrade = insertWorkshopGradeSchema.parse({
    ...workshopGrade,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .insert(workshopGrades)
      .values(newWorkshopGrade)
      .returning();
    return { workshopGrade: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopGrade = async (
  id: WorkshopGradeId,
  workshopGrade: UpdateWorkshopGradeParams,
) => {
  const { session } = await getUserAuth();
  const { id: workshopGradeId } = workshopGradeIdSchema.parse({ id });
  const newWorkshopGrade = updateWorkshopGradeSchema.parse({
    ...workshopGrade,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .update(workshopGrades)
      .set(newWorkshopGrade)
      .where(
        and(
          eq(workshopGrades.id, workshopGradeId!),
          eq(workshopGrades.userId, session?.user.id!),
        ),
      )
      .returning();
    return { workshopGrade: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopGrade = async (id: WorkshopGradeId) => {
  const { session } = await getUserAuth();
  const { id: workshopGradeId } = workshopGradeIdSchema.parse({ id });
  try {
    const [w] = await db
      .delete(workshopGrades)
      .where(
        and(
          eq(workshopGrades.id, workshopGradeId!),
          eq(workshopGrades.userId, session?.user.id!),
        ),
      )
      .returning();
    return { workshopGrade: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
