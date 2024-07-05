import { eq } from "drizzle-orm";

import type { AssignSubmissionOnlineTextId } from "../../db/schema/assignSubmissionOnlineTexts";
import { db } from "../../db/index";
import { assignments } from "../../db/schema/assignments";
import {
  assignSubmissionOnlineTextIdSchema,
  assignSubmissionOnlineTexts,
} from "../../db/schema/assignSubmissionOnlineTexts";

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
