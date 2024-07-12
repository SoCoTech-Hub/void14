import { db } from "@soco/assignment-db/client";
import { eq, and } from "@soco/assignment-db";
import { getUserAuth } from "@soco/auth-service";
import { type AssignUserMappingId, assignUserMappingIdSchema, assignUserMappings } from "@soco/assignment-db/schema/assignUserMappings";
import { assignments } from "@soco/assignment-db/schema/assignments";

export const getAssignUserMappings = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ assignUserMapping: assignUserMappings, assignment: assignments }).from(assignUserMappings).leftJoin(assignments, eq(assignUserMappings.assignmentId, assignments.id)).where(eq(assignUserMappings.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.assignUserMapping, assignment: r.assignment})); 
  return { assignUserMappings: a };
};

export const getAssignUserMappingById = async (id: AssignUserMappingId) => {
  const { session } = await getUserAuth();
  const { id: assignUserMappingId } = assignUserMappingIdSchema.parse({ id });
  const [row] = await db.select({ assignUserMapping: assignUserMappings, assignment: assignments }).from(assignUserMappings).where(and(eq(assignUserMappings.id, assignUserMappingId), eq(assignUserMappings.userId, session?.user.id!))).leftJoin(assignments, eq(assignUserMappings.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a =  { ...row.assignUserMapping, assignment: row.assignment } ;
  return { assignUserMapping: a };
};


