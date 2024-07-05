import { eq } from "drizzle-orm";

import type { AssignFeedbackCommentId } from "../../db/schema/assignFeedbackComments";
import { db } from "../../db/index";
import {
  assignFeedbackCommentIdSchema,
  assignFeedbackComments,
} from "../../db/schema/assignFeedbackComments";
import { assignments } from "../../db/schema/assignments";

export const getAssignFeedbackComments = async () => {
  const rows = await db
    .select({
      assignFeedbackComment: assignFeedbackComments,
      assignment: assignments,
    })
    .from(assignFeedbackComments)
    .leftJoin(
      assignments,
      eq(assignFeedbackComments.assignmentId, assignments.id),
    );
  const a = rows.map((r) => ({
    ...r.assignFeedbackComment,
    assignment: r.assignment,
  }));
  return { assignFeedbackComments: a };
};

export const getAssignFeedbackCommentById = async (
  id: AssignFeedbackCommentId,
) => {
  const { id: assignFeedbackCommentId } = assignFeedbackCommentIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      assignFeedbackComment: assignFeedbackComments,
      assignment: assignments,
    })
    .from(assignFeedbackComments)
    .where(eq(assignFeedbackComments.id, assignFeedbackCommentId))
    .leftJoin(
      assignments,
      eq(assignFeedbackComments.assignmentId, assignments.id),
    );
  if (row === undefined) return {};
  const a = { ...row.assignFeedbackComment, assignment: row.assignment };
  return { assignFeedbackComment: a };
};
