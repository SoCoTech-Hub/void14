import type {
  NewWorkshopFormCommentParams,
  UpdateWorkshopFormCommentParams,
  WorkshopFormCommentId,
} from "@soco/workshop-db/schema/workshopFormComments";
import { eq } from "@soco/workshop-db";
import { db } from "@soco/workshop-db/client";
import {
  insertWorkshopFormCommentSchema,
  updateWorkshopFormCommentSchema,
  workshopFormCommentIdSchema,
  workshopFormComments,
} from "@soco/workshop-db/schema/workshopFormComments";

export const createWorkshopFormComment = async (
  workshopFormComment: NewWorkshopFormCommentParams,
) => {
  const newWorkshopFormComment =
    insertWorkshopFormCommentSchema.parse(workshopFormComment);
  try {
    const [w] = await db
      .insert(workshopFormComments)
      .values(newWorkshopFormComment)
      .returning();
    return { workshopFormComment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateWorkshopFormComment = async (
  id: WorkshopFormCommentId,
  workshopFormComment: UpdateWorkshopFormCommentParams,
) => {
  const { id: workshopFormCommentId } = workshopFormCommentIdSchema.parse({
    id,
  });
  const newWorkshopFormComment =
    updateWorkshopFormCommentSchema.parse(workshopFormComment);
  try {
    const [w] = await db
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
  const { id: workshopFormCommentId } = workshopFormCommentIdSchema.parse({
    id,
  });
  try {
    const [w] = await db
      .delete(workshopFormComments)
      .where(eq(workshopFormComments.id, workshopFormCommentId!))
      .returning();
    return { workshopFormComment: w };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
