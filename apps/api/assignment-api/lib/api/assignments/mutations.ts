import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  AssignmentId,
  assignmentIdSchema,
  assignments,
  insertAssignmentSchema,
  NewAssignmentParams,
  UpdateAssignmentParams,
  updateAssignmentSchema,
} from "../../db/schema/assignments";

export const createAssignment = async (assignment: NewAssignmentParams) => {
  const newAssignment = insertAssignmentSchema.parse(assignment);
  try {
    const [a] = await db.insert(assignments).values(newAssignment).returning();
    return { assignment: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignment = async (
  id: AssignmentId,
  assignment: UpdateAssignmentParams,
) => {
  const { id: assignmentId } = assignmentIdSchema.parse({ id });
  const newAssignment = updateAssignmentSchema.parse(assignment);
  try {
    const [a] = await db
      .update(assignments)
      .set({ ...newAssignment, updatedAt: new Date() })
      .where(eq(assignments.id, assignmentId!))
      .returning();
    return { assignment: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignment = async (id: AssignmentId) => {
  const { id: assignmentId } = assignmentIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignments)
      .where(eq(assignments.id, assignmentId!))
      .returning();
    return { assignment: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
