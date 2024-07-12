import type { AssignSubmissionOnlineTextId } from "@soco/assignment-db/schema/assignSubmissionOnlineTexts";
import { eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import { assignments } from "@soco/assignment-db/schema/assignments";
import {
  assignSubmissionOnlineTextIdSchema,
  assignSubmissionOnlineTexts,
} from "@soco/assignment-db/schema/assignSubmissionOnlineTexts";

export const getAssignSubmissionOnlineTexts = async () => {
  const rows = await db
    .select({
      assignSubmissionOnlineText: assignSubmissionOnlineTexts,
      assignment: assignments,
    })
    .from(assignSubmissionOnlineTexts)
    .leftJoin(
      assignments,
      eq(assignSubmissionOnlineTexts.assignmentId, assignments.id),
    );
  const a = rows.map((r) => ({
    ...r.assignSubmissionOnlineText,
    assignment: r.assignment,
  }));
  return { assignSubmissionOnlineTexts: a };
};

export const getAssignSubmissionOnlineTextById = async (
  id: AssignSubmissionOnlineTextId,
) => {
  const { id: assignSubmissionOnlineTextId } =
    assignSubmissionOnlineTextIdSchema.parse({ id });
  const [row] = await db
    .select({
      assignSubmissionOnlineText: assignSubmissionOnlineTexts,
      assignment: assignments,
    })
    .from(assignSubmissionOnlineTexts)
    .where(eq(assignSubmissionOnlineTexts.id, assignSubmissionOnlineTextId))
    .leftJoin(
      assignments,
      eq(assignSubmissionOnlineTexts.assignmentId, assignments.id),
    );
  if (row === undefined) return {};
  const a = { ...row.assignSubmissionOnlineText, assignment: row.assignment };
  return { assignSubmissionOnlineText: a };
};
