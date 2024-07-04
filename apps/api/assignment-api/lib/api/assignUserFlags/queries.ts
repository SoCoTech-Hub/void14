import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type AssignUserFlagId, assignUserFlagIdSchema, assignUserFlags } from "@/lib/db/schema/assignUserFlags";
import { assignments } from "@/lib/db/schema/assignments";

export const getAssignUserFlags = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ assignUserFlag: assignUserFlags, assignment: assignments }).from(assignUserFlags).leftJoin(assignments, eq(assignUserFlags.assignmentId, assignments.id)).where(eq(assignUserFlags.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.assignUserFlag, assignment: r.assignment})); 
  return { assignUserFlags: a };
};

export const getAssignUserFlagById = async (id: AssignUserFlagId) => {
  const { session } = await getUserAuth();
  const { id: assignUserFlagId } = assignUserFlagIdSchema.parse({ id });
  const [row] = await db.select({ assignUserFlag: assignUserFlags, assignment: assignments }).from(assignUserFlags).where(and(eq(assignUserFlags.id, assignUserFlagId), eq(assignUserFlags.userId, session?.user.id!))).leftJoin(assignments, eq(assignUserFlags.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a =  { ...row.assignUserFlag, assignment: row.assignment } ;
  return { assignUserFlag: a };
};


