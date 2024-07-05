import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  AssignId,
  assignIdSchema,
  assigns,
  insertAssignSchema,
  NewAssignParams,
  UpdateAssignParams,
  updateAssignSchema,
} from "../../db/schema/assigns";

export const createAssign = async (assign: NewAssignParams) => {
  const newAssign = insertAssignSchema.parse(assign);
  try {
    const [a] = await db.insert(assigns).values(newAssign).returning();
    return { assign: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssign = async (
  id: AssignId,
  assign: UpdateAssignParams,
) => {
  const { id: assignId } = assignIdSchema.parse({ id });
  const newAssign = updateAssignSchema.parse(assign);
  try {
    const [a] = await db
      .update(assigns)
      .set({ ...newAssign, updatedAt: new Date() })
      .where(eq(assigns.id, assignId!))
      .returning();
    return { assign: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssign = async (id: AssignId) => {
  const { id: assignId } = assignIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assigns)
      .where(eq(assigns.id, assignId!))
      .returning();
    return { assign: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
