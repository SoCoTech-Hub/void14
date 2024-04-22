import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  AssignFeedbackEditpdfQueueId, 
  NewAssignFeedbackEditpdfQueueParams,
  UpdateAssignFeedbackEditpdfQueueParams, 
  updateAssignFeedbackEditpdfQueueSchema,
  insertAssignFeedbackEditpdfQueueSchema, 
  assignFeedbackEditpdfQueues,
  assignFeedbackEditpdfQueueIdSchema 
} from "@/lib/db/schema/assignFeedbackEditpdfQueues";

export const createAssignFeedbackEditpdfQueue = async (assignFeedbackEditpdfQueue: NewAssignFeedbackEditpdfQueueParams) => {
  const newAssignFeedbackEditpdfQueue = insertAssignFeedbackEditpdfQueueSchema.parse(assignFeedbackEditpdfQueue);
  try {
    const [a] =  await db.insert(assignFeedbackEditpdfQueues).values(newAssignFeedbackEditpdfQueue).returning();
    return { assignFeedbackEditpdfQueue: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackEditpdfQueue = async (id: AssignFeedbackEditpdfQueueId, assignFeedbackEditpdfQueue: UpdateAssignFeedbackEditpdfQueueParams) => {
  const { id: assignFeedbackEditpdfQueueId } = assignFeedbackEditpdfQueueIdSchema.parse({ id });
  const newAssignFeedbackEditpdfQueue = updateAssignFeedbackEditpdfQueueSchema.parse(assignFeedbackEditpdfQueue);
  try {
    const [a] =  await db
     .update(assignFeedbackEditpdfQueues)
     .set(newAssignFeedbackEditpdfQueue)
     .where(eq(assignFeedbackEditpdfQueues.id, assignFeedbackEditpdfQueueId!))
     .returning();
    return { assignFeedbackEditpdfQueue: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackEditpdfQueue = async (id: AssignFeedbackEditpdfQueueId) => {
  const { id: assignFeedbackEditpdfQueueId } = assignFeedbackEditpdfQueueIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignFeedbackEditpdfQueues).where(eq(assignFeedbackEditpdfQueues.id, assignFeedbackEditpdfQueueId!))
    .returning();
    return { assignFeedbackEditpdfQueue: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

