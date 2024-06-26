import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AssignmentId, assignmentIdSchema, assignments } from "@/lib/db/schema/assignments";

export const getAssignments = async () => {
  const rows = await db.select().from(assignments);
  const a = rows
  return { assignments: a };
};

export const getAssignmentById = async (id: AssignmentId) => {
  const { id: assignmentId } = assignmentIdSchema.parse({ id });
  const [row] = await db.select().from(assignments).where(eq(assignments.id, assignmentId));
  if (row === undefined) return {};
  const a = row;
  return { assignment: a };
};


