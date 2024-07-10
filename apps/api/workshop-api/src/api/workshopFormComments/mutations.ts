import { db } from "@soco/workshop-db/client";
import { eq } from "@soco/workshop-db";
import { 
  WorkshopFormCommentId, 
  NewWorkshopFormCommentParams,
  UpdateWorkshopFormCommentParams, 
  updateWorkshopFormCommentSchema,
  insertWorkshopFormCommentSchema, 
  workshopFormComments,
  workshopFormCommentIdSchema 
} from "@soco/workshop-db/schema/workshopFormComments";

export const createWorkshopFormComment = async (workshopFormComment: NewWorkshopFormCommentParams) => {
  const newWorkshopFormComment = insertWorkshopFormCommentSchema.parse(workshopFormComment);
  try {
    const [w] =  await db.insert(workshopFormComments).values(newWorkshopFormComment).returning();
    return { workshopFormComment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormComment = async (id: WorkshopFormCommentId, workshopFormComment: UpdateWorkshopFormCommentParams) => {
  const { id: workshopFormCommentId } = workshopFormCommentIdSchema.parse({ id });
  const newWorkshopFormComment = updateWorkshopFormCommentSchema.parse(workshopFormComment);
  try {
    const [w] =  await db
     .update(workshopFormComments)
     .set(newWorkshopFormComment)
     .where(eq(workshopFormComments.id, workshopFormCommentId!))
     .returning();
    return { workshopFormComment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteWorkshopFormComment = async (id: WorkshopFormCommentId) => {
  const { id: workshopFormCommentId } = workshopFormCommentIdSchema.parse({ id });
  try {
    const [w] =  await db.delete(workshopFormComments).where(eq(workshopFormComments.id, workshopFormCommentId!))
    .returning();
    return { workshopFormComment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

