import { eq } from "drizzle-orm";

import type { AssignmentUpgradeId } from "../db/schema/assignmentUpgrades";
import { db } from "../db/index";
import {
  assignmentUpgradeIdSchema,
  assignmentUpgrades,
} from "../db/schema/assignmentUpgrades";

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
