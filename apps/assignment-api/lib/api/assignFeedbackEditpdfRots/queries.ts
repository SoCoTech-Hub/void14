import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AssignFeedbackEditpdfRotId, assignFeedbackEditpdfRotIdSchema, assignFeedbackEditpdfRots } from "@/lib/db/schema/assignFeedbackEditpdfRots";

export const getAssignFeedbackEditpdfRots = async () => {
  const rows = await db.select().from(assignFeedbackEditpdfRots);
  const a = rows
  return { assignFeedbackEditpdfRots: a };
};

export const getAssignFeedbackEditpdfRotById = async (id: AssignFeedbackEditpdfRotId) => {
  const { id: assignFeedbackEditpdfRotId } = assignFeedbackEditpdfRotIdSchema.parse({ id });
  const [row] = await db.select().from(assignFeedbackEditpdfRots).where(eq(assignFeedbackEditpdfRots.id, assignFeedbackEditpdfRotId));
  if (row === undefined) return {};
  const a = row;
  return { assignFeedbackEditpdfRot: a };
};


