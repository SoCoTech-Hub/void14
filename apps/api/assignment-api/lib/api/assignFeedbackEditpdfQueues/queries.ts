import { eq } from "drizzle-orm";

import type { AssignFeedbackEditpdfQueueId } from "../db/schema/assignFeedbackEditpdfQueues";
import { db } from "../db/index";
import {
  assignFeedbackEditpdfQueueIdSchema,
  assignFeedbackEditpdfQueues,
} from "../db/schema/assignFeedbackEditpdfQueues";

export const getAssignFeedbackEditpdfQueues = async () => {
  const rows = await db.select().from(assignFeedbackEditpdfQueues);
  const a = rows;
  return { assignFeedbackEditpdfQueues: a };
};

export const getAssignFeedbackEditpdfQueueById = async (
  id: AssignFeedbackEditpdfQueueId,
) => {
  const { id: assignFeedbackEditpdfQueueId } =
    assignFeedbackEditpdfQueueIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(assignFeedbackEditpdfQueues)
    .where(eq(assignFeedbackEditpdfQueues.id, assignFeedbackEditpdfQueueId));
  if (row === undefined) return {};
  const a = row;
  return { assignFeedbackEditpdfQueue: a };
};
