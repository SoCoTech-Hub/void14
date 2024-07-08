import { db } from "@soco/assignment-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type AssignSubmissionId, assignSubmissionIdSchema, assignSubmissions } from "@soco/assignment-db/schema/assignSubmissions";
import { assignments } from "@soco/assignment-db/schema/assignments";

export const getAssignSubmissions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ assignSubmission: assignSubmissions, assignment: assignments }).from(assignSubmissions).leftJoin(assignments, eq(assignSubmissions.assignmentId, assignments.id)).where(eq(assignSubmissions.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.assignSubmission, assignment: r.assignment})); 
  return { assignSubmissions: a };
};

export const getAssignSubmissionById = async (id: AssignSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: assignSubmissionId } = assignSubmissionIdSchema.parse({ id });
  const [row] = await db.select({ assignSubmission: assignSubmissions, assignment: assignments }).from(assignSubmissions).where(and(eq(assignSubmissions.id, assignSubmissionId), eq(assignSubmissions.userId, session?.user.id!))).leftJoin(assignments, eq(assignSubmissions.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a =  { ...row.assignSubmission, assignment: row.assignment } ;
  return { assignSubmission: a };
};


