import { db } from "@soco/assignment-db/client";
import { eq, and } from "@soco/assignment-db";
import { getUserAuth } from "@soco/auth-service";
import { type AssignmentSubmissionId, assignmentSubmissionIdSchema, assignmentSubmissions } from "@soco/assignment-db/schema/assignmentSubmissions";
import { assignments } from "@soco/assignment-db/schema/assignments";

export const getAssignmentSubmissions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ assignmentSubmission: assignmentSubmissions, assignment: assignments }).from(assignmentSubmissions).leftJoin(assignments, eq(assignmentSubmissions.assignmentId, assignments.id)).where(eq(assignmentSubmissions.userId, session?.user.id!));
  const a = rows .map((r) => ({ ...r.assignmentSubmission, assignment: r.assignment})); 
  return { assignmentSubmissions: a };
};

export const getAssignmentSubmissionById = async (id: AssignmentSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: assignmentSubmissionId } = assignmentSubmissionIdSchema.parse({ id });
  const [row] = await db.select({ assignmentSubmission: assignmentSubmissions, assignment: assignments }).from(assignmentSubmissions).where(and(eq(assignmentSubmissions.id, assignmentSubmissionId), eq(assignmentSubmissions.userId, session?.user.id!))).leftJoin(assignments, eq(assignmentSubmissions.assignmentId, assignments.id));
  if (row === undefined) return {};
  const a =  { ...row.assignmentSubmission, assignment: row.assignment } ;
  return { assignmentSubmission: a };
};


