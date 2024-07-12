import type {
  AssignFeedbackEditpdfAnnotId,
  NewAssignFeedbackEditpdfAnnotParams,
  UpdateAssignFeedbackEditpdfAnnotParams,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfAnnots";
import { eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignFeedbackEditpdfAnnotIdSchema,
  assignFeedbackEditpdfAnnots,
  insertAssignFeedbackEditpdfAnnotSchema,
  updateAssignFeedbackEditpdfAnnotSchema,
} from "@soco/assignment-db/schema/assignFeedbackEditpdfAnnots";

export const createAssignFeedbackEditpdfAnnot = async (
  assignFeedbackEditpdfAnnot: NewAssignFeedbackEditpdfAnnotParams,
) => {
  const newAssignFeedbackEditpdfAnnot =
    insertAssignFeedbackEditpdfAnnotSchema.parse(assignFeedbackEditpdfAnnot);
  try {
    const [a] = await db
      .insert(assignFeedbackEditpdfAnnots)
      .values(newAssignFeedbackEditpdfAnnot)
      .returning();
    return { assignFeedbackEditpdfAnnot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackEditpdfAnnot = async (
  id: AssignFeedbackEditpdfAnnotId,
  assignFeedbackEditpdfAnnot: UpdateAssignFeedbackEditpdfAnnotParams,
) => {
  const { id: assignFeedbackEditpdfAnnotId } =
    assignFeedbackEditpdfAnnotIdSchema.parse({ id });
  const newAssignFeedbackEditpdfAnnot =
    updateAssignFeedbackEditpdfAnnotSchema.parse(assignFeedbackEditpdfAnnot);
  try {
    const [a] = await db
      .update(assignFeedbackEditpdfAnnots)
      .set(newAssignFeedbackEditpdfAnnot)
      .where(eq(assignFeedbackEditpdfAnnots.id, assignFeedbackEditpdfAnnotId!))
      .returning();
    return { assignFeedbackEditpdfAnnot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackEditpdfAnnot = async (
  id: AssignFeedbackEditpdfAnnotId,
) => {
  const { id: assignFeedbackEditpdfAnnotId } =
    assignFeedbackEditpdfAnnotIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignFeedbackEditpdfAnnots)
      .where(eq(assignFeedbackEditpdfAnnots.id, assignFeedbackEditpdfAnnotId!))
      .returning();
    return { assignFeedbackEditpdfAnnot: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
