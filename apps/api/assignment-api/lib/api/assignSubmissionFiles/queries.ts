import { eq } from "drizzle-orm";

import type { AssignSubmissionFileId } from "../db/schema/assignSubmissionFiles";
import { db } from "../db/index";
import { assignments } from "../db/schema/assignments";
import {
  assignSubmissionFileIdSchema,
  assignSubmissionFiles,
} from "../db/schema/assignSubmissionFiles";

export const getAssignSubmissionFiles = async () => {
  const rows = await db
    .select({
      assignSubmissionFile: assignSubmissionFiles,
      assignment: assignments,
    })
    .from(assignSubmissionFiles)
    .leftJoin(
      assignments,
      eq(assignSubmissionFiles.assignmentId, assignments.id),
    );
  const a = rows.map((r) => ({
    ...r.assignSubmissionFile,
    assignment: r.assignment,
  }));
  return { assignSubmissionFiles: a };
};

export const getAssignSubmissionFileById = async (
  id: AssignSubmissionFileId,
) => {
  const { id: assignSubmissionFileId } = assignSubmissionFileIdSchema.parse({
    id,
  });
  const [row] = await db
    .select({
      assignSubmissionFile: assignSubmissionFiles,
      assignment: assignments,
    })
    .from(assignSubmissionFiles)
    .where(eq(assignSubmissionFiles.id, assignSubmissionFileId))
    .leftJoin(
      assignments,
      eq(assignSubmissionFiles.assignmentId, assignments.id),
    );
  if (row === undefined) return {};
  const a = { ...row.assignSubmissionFile, assignment: row.assignment };
  return { assignSubmissionFile: a };
};
