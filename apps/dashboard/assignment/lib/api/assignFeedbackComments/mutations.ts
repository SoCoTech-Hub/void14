import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { 
  type AssignFeedbackCommentId, 
  type NewAssignFeedbackCommentParams,
  type UpdateAssignFeedbackCommentParams, 
  updateAssignFeedbackCommentSchema,
  insertAssignFeedbackCommentSchema, 
  assignFeedbackComments,
  assignFeedbackCommentIdSchema 
} from "@/lib/db/schema/assignFeedbackComments";

export const createAssignFeedbackComment = async (assignFeedbackComment: NewAssignFeedbackCommentParams) => {
  const newAssignFeedbackComment = insertAssignFeedbackCommentSchema.parse(assignFeedbackComment);
  try {
    const [a] =  await db.insert(assignFeedbackComments).values(newAssignFeedbackComment).returning();
    return { assignFeedbackComment: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackComment = async (id: AssignFeedbackCommentId, assignFeedbackComment: UpdateAssignFeedbackCommentParams) => {
  const { id: assignFeedbackCommentId } = assignFeedbackCommentIdSchema.parse({ id });
  const newAssignFeedbackComment = updateAssignFeedbackCommentSchema.parse(assignFeedbackComment);
  try {
    const [a] =  await db
     .update(assignFeedbackComments)
     .set({...newAssignFeedbackComment, updatedAt: new Date() })
     .where(eq(assignFeedbackComments.id, assignFeedbackCommentId!))
     .returning();
    return { assignFeedbackComment: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackComment = async (id: AssignFeedbackCommentId) => {
  const { id: assignFeedbackCommentId } = assignFeedbackCommentIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignFeedbackComments).where(eq(assignFeedbackComments.id, assignFeedbackCommentId!))
    .returning();
    return { assignFeedbackComment: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

