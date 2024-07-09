import type {
  AssignSubmissionOnlineTextId,
  NewAssignSubmissionOnlineTextParams,
  UpdateAssignSubmissionOnlineTextParams,
} from "@soco/assignment-db/schema/assignSubmissionOnlineTexts";
import { db, eq } from "@soco/assignment-db";
import {
  assignSubmissionOnlineTextIdSchema,
  assignSubmissionOnlineTexts,
  insertAssignSubmissionOnlineTextSchema,
  updateAssignSubmissionOnlineTextSchema,
} from "@soco/assignment-db/schema/assignSubmissionOnlineTexts";

export const createAssignSubmissionOnlineText = async (
  assignSubmissionOnlineText: NewAssignSubmissionOnlineTextParams,
) => {
  const newAssignSubmissionOnlineText =
    insertAssignSubmissionOnlineTextSchema.parse(assignSubmissionOnlineText);
  try {
    const [a] = await db
      .insert(assignSubmissionOnlineTexts)
      .values(newAssignSubmissionOnlineText)
      .returning();
    return { assignSubmissionOnlineText: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignSubmissionOnlineText = async (
  id: AssignSubmissionOnlineTextId,
  assignSubmissionOnlineText: UpdateAssignSubmissionOnlineTextParams,
) => {
  const { id: assignSubmissionOnlineTextId } =
    assignSubmissionOnlineTextIdSchema.parse({ id });
  const newAssignSubmissionOnlineText =
    updateAssignSubmissionOnlineTextSchema.parse(assignSubmissionOnlineText);
  try {
    const [a] = await db
      .update(assignSubmissionOnlineTexts)
      .set(newAssignSubmissionOnlineText)
      .where(eq(assignSubmissionOnlineTexts.id, assignSubmissionOnlineTextId!))
      .returning();
    return { assignSubmissionOnlineText: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignSubmissionOnlineText = async (
  id: AssignSubmissionOnlineTextId,
) => {
  const { id: assignSubmissionOnlineTextId } =
    assignSubmissionOnlineTextIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignSubmissionOnlineTexts)
      .where(eq(assignSubmissionOnlineTexts.id, assignSubmissionOnlineTextId!))
      .returning();
    return { assignSubmissionOnlineText: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
