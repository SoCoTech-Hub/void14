import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  GradeItemId,
  gradeItemIdSchema,
  gradeItems,
  insertGradeItemSchema,
  NewGradeItemParams,
  UpdateGradeItemParams,
  updateGradeItemSchema,
} from "../db/schema/gradeItems";

export const createGradeItem = async (gradeItem: NewGradeItemParams) => {
  const newGradeItem = insertGradeItemSchema.parse(gradeItem);
  try {
    const [g] = await db.insert(gradeItems).values(newGradeItem).returning();
    return { gradeItem: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateGradeItem = async (
  id: GradeItemId,
  gradeItem: UpdateGradeItemParams,
) => {
  const { id: gradeItemId } = gradeItemIdSchema.parse({ id });
  const newGradeItem = updateGradeItemSchema.parse(gradeItem);
  try {
    const [g] = await db
      .update(gradeItems)
      .set({ ...newGradeItem, updatedAt: new Date() })
      .where(eq(gradeItems.id, gradeItemId!))
      .returning();
    return { gradeItem: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteGradeItem = async (id: GradeItemId) => {
  const { id: gradeItemId } = gradeItemIdSchema.parse({ id });
  try {
    const [g] = await db
      .delete(gradeItems)
      .where(eq(gradeItems.id, gradeItemId!))
      .returning();
    return { gradeItem: g };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
