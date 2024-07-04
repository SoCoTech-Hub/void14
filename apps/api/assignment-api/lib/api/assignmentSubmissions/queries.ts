import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { AssignmentSubmissionId } from "../db/schema/assignmentSubmissions";
import { db } from "../db/index";
import { assignments } from "../db/schema/assignments";
import {
  assignmentSubmissionIdSchema,
  assignmentSubmissions,
} from "../db/schema/assignmentSubmissions";

export const getAssignmentSubmissions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({
      assignmentSubmission: assignmentSubmissions,
      assignment: assignments,
    })
    .from(assignmentSubmissions)
    .leftJoin(
      assignments,
      eq(assignmentSubmissions.assignmentId, assignments.id),
    )
    .where(eq(assignmentSubmissions.userId, session?.user.id!));
  const a = rows.map((r) => ({
    ...r.assignmentSubmission,
    assignment: r.assignment,
  }));
  return { assignmentSubmissions: a };
};

export const getAssignmentSubmissionById = async (
  id: AssignmentSubmissionId,
) => {
  const { session } = await getUserAuth();
  const { id: assignmentSubmissionId } = assignmentSubmissionIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      assignmentSubmission: assignmentSubmissions,
      assignment: assignments,
    })
    .from(assignmentSubmissions)
    .where(
      and(
        eq(assignmentSubmissions.id, assignmentSubmissionId),
        eq(assignmentSubmissions.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      assignments,
      eq(assignmentSubmissions.assignmentId, assignments.id),
    );
  if (row === undefined) return {};
  const a = { ...row.assignmentSubmission, assignment: row.assignment };
  return { assignmentSubmission: a };
};
