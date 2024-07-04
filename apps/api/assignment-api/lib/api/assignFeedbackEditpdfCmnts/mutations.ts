import { eq } from "drizzle-orm";

import { db } from "../db/index";
import {
  AssignFeedbackEditpdfCmntId,
  assignFeedbackEditpdfCmntIdSchema,
  assignFeedbackEditpdfCmnts,
  insertAssignFeedbackEditpdfCmntSchema,
  NewAssignFeedbackEditpdfCmntParams,
  UpdateAssignFeedbackEditpdfCmntParams,
  updateAssignFeedbackEditpdfCmntSchema,
} from "../db/schema/assignFeedbackEditpdfCmnts";

export const createAssignFeedbackEditpdfCmnt = async (
  assignFeedbackEditpdfCmnt: NewAssignFeedbackEditpdfCmntParams,
) => {
  const newAssignFeedbackEditpdfCmnt =
    insertAssignFeedbackEditpdfCmntSchema.parse(assignFeedbackEditpdfCmnt);
  try {
    const [a] = await db
      .insert(assignFeedbackEditpdfCmnts)
      .values(newAssignFeedbackEditpdfCmnt)
      .returning();
    return { assignFeedbackEditpdfCmnt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackEditpdfCmnt = async (
  id: AssignFeedbackEditpdfCmntId,
  assignFeedbackEditpdfCmnt: UpdateAssignFeedbackEditpdfCmntParams,
) => {
  const { id: assignFeedbackEditpdfCmntId } =
    assignFeedbackEditpdfCmntIdSchema.parse({ id });
  const newAssignFeedbackEditpdfCmnt =
    updateAssignFeedbackEditpdfCmntSchema.parse(assignFeedbackEditpdfCmnt);
  try {
    const [a] = await db
      .update(assignFeedbackEditpdfCmnts)
      .set(newAssignFeedbackEditpdfCmnt)
      .where(eq(assignFeedbackEditpdfCmnts.id, assignFeedbackEditpdfCmntId!))
      .returning();
    return { assignFeedbackEditpdfCmnt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackEditpdfCmnt = async (
  id: AssignFeedbackEditpdfCmntId,
) => {
  const { id: assignFeedbackEditpdfCmntId } =
    assignFeedbackEditpdfCmntIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignFeedbackEditpdfCmnts)
      .where(eq(assignFeedbackEditpdfCmnts.id, assignFeedbackEditpdfCmntId!))
      .returning();
    return { assignFeedbackEditpdfCmnt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
