import { eq } from "drizzle-orm";

import type { AssignFeedbackEditpdfAnnotId } from "../db/schema/assignFeedbackEditpdfAnnots";
import { db } from "../db/index";
import {
  assignFeedbackEditpdfAnnotIdSchema,
  assignFeedbackEditpdfAnnots,
} from "../db/schema/assignFeedbackEditpdfAnnots";

export const getAssignFeedbackEditpdfAnnots = async () => {
  const rows = await db.select().from(assignFeedbackEditpdfAnnots);
  const a = rows;
  return { assignFeedbackEditpdfAnnots: a };
};

export const getAssignFeedbackEditpdfAnnotById = async (
  id: AssignFeedbackEditpdfAnnotId,
) => {
  const { id: assignFeedbackEditpdfAnnotId } =
    assignFeedbackEditpdfAnnotIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(assignFeedbackEditpdfAnnots)
    .where(eq(assignFeedbackEditpdfAnnots.id, assignFeedbackEditpdfAnnotId));
  if (row === undefined) return {};
  const a = row;
  return { assignFeedbackEditpdfAnnot: a };
};
