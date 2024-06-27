import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type AssignFeedbackEditpdfQueueId, assignFeedbackEditpdfQueueIdSchema, assignFeedbackEditpdfQueues } from "@/lib/db/schema/assignFeedbackEditpdfQueues";

export const getAssignFeedbackEditpdfQueues = async () => {
  const rows = await db.select().from(assignFeedbackEditpdfQueues);
  const a = rows
  return { assignFeedbackEditpdfQueues: a };
};

export const getAssignFeedbackEditpdfQueueById = async (id: AssignFeedbackEditpdfQueueId) => {
  const { id: assignFeedbackEditpdfQueueId } = assignFeedbackEditpdfQueueIdSchema.parse({ id });
  const [row] = await db.select().from(assignFeedbackEditpdfQueues).where(eq(assignFeedbackEditpdfQueues.id, assignFeedbackEditpdfQueueId));
  if (row === undefined) return {};
  const a = row;
  return { assignFeedbackEditpdfQueue: a };
};


