import type { AssignFeedbackEditpdfCmntId } from "@soco/assignment-db/schema/assignFeedbackEditpdfCmnts";
import { eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignFeedbackEditpdfCmntIdSchema,
  assignFeedbackEditpdfCmnts,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfCmnts";

export const getAssignFeedbackEditpdfCmnts = async () => {
  const rows = await db.select().from(assignFeedbackEditpdfCmnts);
  const a = rows;
  return { assignFeedbackEditpdfCmnts: a };
};

export const getAssignFeedbackEditpdfCmntById = async (
  id: AssignFeedbackEditpdfCmntId,
) => {
  const { id: assignFeedbackEditpdfCmntId } =
    assignFeedbackEditpdfCmntIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(assignFeedbackEditpdfCmnts)
    .where(eq(assignFeedbackEditpdfCmnts.id, assignFeedbackEditpdfCmntId));
  if (row === undefined) return {};
  const a = row;
  return { assignFeedbackEditpdfCmnt: a };
};
