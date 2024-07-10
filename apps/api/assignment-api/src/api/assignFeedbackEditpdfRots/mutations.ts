import { db } from "@soco/assignment-db/client";
import { eq } from "@soco/assignment-db";
import { 
  AssignFeedbackEditpdfRotId, 
  NewAssignFeedbackEditpdfRotParams,
  UpdateAssignFeedbackEditpdfRotParams, 
  updateAssignFeedbackEditpdfRotSchema,
  insertAssignFeedbackEditpdfRotSchema, 
  assignFeedbackEditpdfRots,
  assignFeedbackEditpdfRotIdSchema 
} from "@soco/assignment-db/schema/assignFeedbackEditpdfRots";

export const createAssignFeedbackEditpdfRot = async (assignFeedbackEditpdfRot: NewAssignFeedbackEditpdfRotParams) => {
  const newAssignFeedbackEditpdfRot = insertAssignFeedbackEditpdfRotSchema.parse(assignFeedbackEditpdfRot);
  try {
    const [a] =  await db.insert(assignFeedbackEditpdfRots).values(newAssignFeedbackEditpdfRot).returning();
    return { assignFeedbackEditpdfRot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackEditpdfRot = async (id: AssignFeedbackEditpdfRotId, assignFeedbackEditpdfRot: UpdateAssignFeedbackEditpdfRotParams) => {
  const { id: assignFeedbackEditpdfRotId } = assignFeedbackEditpdfRotIdSchema.parse({ id });
  const newAssignFeedbackEditpdfRot = updateAssignFeedbackEditpdfRotSchema.parse(assignFeedbackEditpdfRot);
  try {
    const [a] =  await db
     .update(assignFeedbackEditpdfRots)
     .set(newAssignFeedbackEditpdfRot)
     .where(eq(assignFeedbackEditpdfRots.id, assignFeedbackEditpdfRotId!))
     .returning();
    return { assignFeedbackEditpdfRot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackEditpdfRot = async (id: AssignFeedbackEditpdfRotId) => {
  const { id: assignFeedbackEditpdfRotId } = assignFeedbackEditpdfRotIdSchema.parse({ id });
  try {
    const [a] =  await db.delete(assignFeedbackEditpdfRots).where(eq(assignFeedbackEditpdfRots.id, assignFeedbackEditpdfRotId!))
    .returning();
    return { assignFeedbackEditpdfRot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

