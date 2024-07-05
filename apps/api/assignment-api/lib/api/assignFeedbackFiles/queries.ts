import { eq } from "drizzle-orm";

import type { AssignFeedbackFileId } from "../../db/schema/assignFeedbackFiles";
import { db } from "../../db/index";
import {
  assignFeedbackFileIdSchema,
  assignFeedbackFiles,
} from "../../db/schema/assignFeedbackFiles";
import { assignments } from "../../db/schema/assignments";

export const getAssignFeedbackFiles = async () => {
  const rows = await db
    .select({
      assignFeedbackFile: assignFeedbackFiles,
      assignment: assignments,
    })
    .from(assignFeedbackFiles)
    .leftJoin(
      assignments,
      eq(assignFeedbackFiles.assignmentId, assignments.id),
    );
  const a = rows.map((r) => ({
    ...r.assignFeedbackFile,
    assignment: r.assignment,
  }));
  return { assignFeedbackFiles: a };
};

export const getAssignFeedbackFileById = async (id: AssignFeedbackFileId) => {
  const { id: assignFeedbackFileId } = assignFeedbackFileIdSchema.parse({ id });
  const [row] = await db
    .select({
      assignFeedbackFile: assignFeedbackFiles,
      assignment: assignments,
    })
    .from(assignFeedbackFiles)
    .where(eq(assignFeedbackFiles.id, assignFeedbackFileId))
    .leftJoin(
      assignments,
      eq(assignFeedbackFiles.assignmentId, assignments.id),
    );
  if (row === undefined) return {};
  const a = { ...row.assignFeedbackFile, assignment: row.assignment };
  return { assignFeedbackFile: a };
};
