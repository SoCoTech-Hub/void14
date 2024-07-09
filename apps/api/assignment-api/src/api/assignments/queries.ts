import type { AssignmentId } from "@soco/assignment-db/schema/assignments";
import { db, eq } from "@soco/assignment-db";
import {
  assignmentIdSchema,
  assignments,
} from "@soco/assignment-db/schema/assignments";

export const getAssignments = async () => {
  const rows = await db.select().from(assignments);
  const a = rows;
  return { assignments: a };
};

export const getAssignmentById = async (id: AssignmentId) => {
  const { id: assignmentId } = assignmentIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(assignments)
    .where(eq(assignments.id, assignmentId));
  if (row === undefined) return {};
  const a = row;
  return { assignment: a };
};
