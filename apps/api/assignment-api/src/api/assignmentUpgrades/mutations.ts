import type {
  AssignmentUpgradeId,
  NewAssignmentUpgradeParams,
  UpdateAssignmentUpgradeParams,
} from "@soco/assignment-db/schema/assignmentUpgrades";
import { eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignmentUpgradeIdSchema,
  assignmentUpgrades,
  insertAssignmentUpgradeSchema,
  updateAssignmentUpgradeSchema,
} from "@soco/assignment-db/schema/assignmentUpgrades";

export const createAssignmentUpgrade = async (
  assignmentUpgrade: NewAssignmentUpgradeParams,
) => {
  const newAssignmentUpgrade =
    insertAssignmentUpgradeSchema.parse(assignmentUpgrade);
  try {
    const [a] = await db
      .insert(assignmentUpgrades)
      .values(newAssignmentUpgrade)
      .returning();
    return { assignmentUpgrade: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignmentUpgrade = async (
  id: AssignmentUpgradeId,
  assignmentUpgrade: UpdateAssignmentUpgradeParams,
) => {
  const { id: assignmentUpgradeId } = assignmentUpgradeIdSchema.parse({ id });
  const newAssignmentUpgrade =
    updateAssignmentUpgradeSchema.parse(assignmentUpgrade);
  try {
    const [a] = await db
      .update(assignmentUpgrades)
      .set({ ...newAssignmentUpgrade, updatedAt: new Date() })
      .where(eq(assignmentUpgrades.id, assignmentUpgradeId!))
      .returning();
    return { assignmentUpgrade: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignmentUpgrade = async (id: AssignmentUpgradeId) => {
  const { id: assignmentUpgradeId } = assignmentUpgradeIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignmentUpgrades)
      .where(eq(assignmentUpgrades.id, assignmentUpgradeId!))
      .returning();
    return { assignmentUpgrade: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
