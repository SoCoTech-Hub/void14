import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/workshop-db/index";
import {
  insertWorkshopAggregationSchema,
  NewWorkshopAggregationParams,
  UpdateWorkshopAggregationParams,
  updateWorkshopAggregationSchema,
  WorkshopAggregationId,
  workshopAggregationIdSchema,
  workshopAggregations,
} from "@soco/workshop-db/schema/workshopAggregations";

export const createWorkshopAggregation = async (
  workshopAggregation: NewWorkshopAggregationParams,
) => {
  const { session } = await getUserAuth();
  const newWorkshopAggregation = insertWorkshopAggregationSchema.parse({
    ...workshopAggregation,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .insert(workshopAggregations)
      .values(newWorkshopAggregation)
      .returning();
    return { workshopAggregation: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopAggregation = async (
  id: WorkshopAggregationId,
  workshopAggregation: UpdateWorkshopAggregationParams,
) => {
  const { session } = await getUserAuth();
  const { id: workshopAggregationId } = workshopAggregationIdSchema.parse({
    id,
  });
  const newWorkshopAggregation = updateWorkshopAggregationSchema.parse({
    ...workshopAggregation,
    userId: session?.user.id!,
  });
  try {
    const [w] = await db
      .update(workshopAggregations)
      .set({ ...newWorkshopAggregation, updatedAt: new Date() })
      .where(
        and(
          eq(workshopAggregations.id, workshopAggregationId!),
          eq(workshopAggregations.userId, session?.user.id!),
        ),
      )
      .returning();
    return { workshopAggregation: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopAggregation = async (id: WorkshopAggregationId) => {
  const { session } = await getUserAuth();
  const { id: workshopAggregationId } = workshopAggregationIdSchema.parse({
    id,
  });
  try {
    const [w] = await db
      .delete(workshopAggregations)
      .where(
        and(
          eq(workshopAggregations.id, workshopAggregationId!),
          eq(workshopAggregations.userId, session?.user.id!),
        ),
      )
      .returning();
    return { workshopAggregation: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
