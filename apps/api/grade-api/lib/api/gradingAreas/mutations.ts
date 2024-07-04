import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  GradingAreaId,
  gradingAreaIdSchema,
  gradingAreas,
  insertGradingAreaSchema,
  NewGradingAreaParams,
  UpdateGradingAreaParams,
  updateGradingAreaSchema,
} from "../db/schema/gradingAreas";

export const createGradingArea = async (gradingArea: NewGradingAreaParams) => {
  const newGradingArea = insertGradingAreaSchema.parse(gradingArea);
  try {
    const [g] = await db
      .insert(gradingAreas)
      .values(newGradingArea)
      .returning();
    return { gradingArea: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradingArea = async (
  id: GradingAreaId,
  gradingArea: UpdateGradingAreaParams,
) => {
  const { id: gradingAreaId } = gradingAreaIdSchema.parse({ id });
  const newGradingArea = updateGradingAreaSchema.parse(gradingArea);
  try {
    const [g] = await db
      .update(gradingAreas)
      .set(newGradingArea)
      .where(eq(gradingAreas.id, gradingAreaId!))
      .returning();
    return { gradingArea: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradingArea = async (id: GradingAreaId) => {
  const { id: gradingAreaId } = gradingAreaIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradingAreas)
      .where(eq(gradingAreas.id, gradingAreaId!))
      .returning();
    return { gradingArea: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
