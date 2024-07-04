import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  insertLtiTypeSchema,
  LtiTypeId,
  ltiTypeIdSchema,
  ltiTypes,
  NewLtiTypeParams,
  UpdateLtiTypeParams,
  updateLtiTypeSchema,
} from "../db/schema/ltiTypes";

export const createLtiType = async (ltiType: NewLtiTypeParams) => {
  const newLtiType = insertLtiTypeSchema.parse(ltiType);
  try {
    const [l] = await db.insert(ltiTypes).values(newLtiType).returning();
    return { ltiType: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLtiType = async (
  id: LtiTypeId,
  ltiType: UpdateLtiTypeParams,
) => {
  const { id: ltiTypeId } = ltiTypeIdSchema.parse({ id });
  const newLtiType = updateLtiTypeSchema.parse(ltiType);
  try {
    const [l] = await db
      .update(ltiTypes)
      .set({ ...newLtiType, updatedAt: new Date() })
      .where(eq(ltiTypes.id, ltiTypeId!))
      .returning();
    return { ltiType: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLtiType = async (id: LtiTypeId) => {
  const { id: ltiTypeId } = ltiTypeIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(ltiTypes)
      .where(eq(ltiTypes.id, ltiTypeId!))
      .returning();
    return { ltiType: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
