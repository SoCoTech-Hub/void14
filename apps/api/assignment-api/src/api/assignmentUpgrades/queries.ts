import type { AssignmentUpgradeId } from "@soco/assignment-db/schema/assignmentUpgrades";
import { eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignmentUpgradeIdSchema,
  assignmentUpgrades,
} from "@soco/assignment-db/schema/assignmentUpgrades";

export const getAssignmentUpgrades = async () => {
  const rows = await db.select().from(assignmentUpgrades);
  const a = rows;
  return { assignmentUpgrades: a };
};

export const getAssignmentUpgradeById = async (id: AssignmentUpgradeId) => {
  const { id: assignmentUpgradeId } = assignmentUpgradeIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(assignmentUpgrades)
    .where(eq(assignmentUpgrades.id, assignmentUpgradeId));
  if (row === undefined) return {};
  const a = row;
  return { assignmentUpgrade: a };
};
