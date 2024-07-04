import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertMnetApplicationSchema,
  MnetApplicationId,
  mnetApplicationIdSchema,
  mnetApplications,
  NewMnetApplicationParams,
  UpdateMnetApplicationParams,
  updateMnetApplicationSchema,
} from "../db/schema/mnetApplications";

export const createMnetApplication = async (
  mnetApplication: NewMnetApplicationParams,
) => {
  const newMnetApplication = insertMnetApplicationSchema.parse(mnetApplication);
  try {
    const [m] = await db
      .insert(mnetApplications)
      .values(newMnetApplication)
      .returning();
    return { mnetApplication: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateMnetApplication = async (
  id: MnetApplicationId,
  mnetApplication: UpdateMnetApplicationParams,
) => {
  const { id: mnetApplicationId } = mnetApplicationIdSchema.parse({ id });
  const newMnetApplication = updateMnetApplicationSchema.parse(mnetApplication);
  try {
    const [m] = await db
      .update(mnetApplications)
      .set(newMnetApplication)
      .where(eq(mnetApplications.id, mnetApplicationId!))
      .returning();
    return { mnetApplication: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteMnetApplication = async (id: MnetApplicationId) => {
  const { id: mnetApplicationId } = mnetApplicationIdSchema.parse({ id });
  try {
    const [m] = await db
      .delete(mnetApplications)
      .where(eq(mnetApplications.id, mnetApplicationId!))
      .returning();
    return { mnetApplication: m };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};