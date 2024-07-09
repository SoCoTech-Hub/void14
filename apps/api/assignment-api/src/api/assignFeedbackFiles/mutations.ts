import type {
  AssignFeedbackFileId,
  NewAssignFeedbackFileParams,
  UpdateAssignFeedbackFileParams,
} from "@soco/assignment-db/schema/assignFeedbackFiles";
import { db, eq } from "@soco/assignment-db";
import {
  assignFeedbackFileIdSchema,
  assignFeedbackFiles,
  insertAssignFeedbackFileSchema,
  updateAssignFeedbackFileSchema,
} from "@soco/assignment-db/schema/assignFeedbackFiles";

export const createAssignFeedbackFile = async (
  assignFeedbackFile: NewAssignFeedbackFileParams,
) => {
  const newAssignFeedbackFile =
    insertAssignFeedbackFileSchema.parse(assignFeedbackFile);
  try {
    const [a] = await db
      .insert(assignFeedbackFiles)
      .values(newAssignFeedbackFile)
      .returning();
    return { assignFeedbackFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignFeedbackFile = async (
  id: AssignFeedbackFileId,
  assignFeedbackFile: UpdateAssignFeedbackFileParams,
) => {
  const { id: assignFeedbackFileId } = assignFeedbackFileIdSchema.parse({ id });
  const newAssignFeedbackFile =
    updateAssignFeedbackFileSchema.parse(assignFeedbackFile);
  try {
    const [a] = await db
      .update(assignFeedbackFiles)
      .set(newAssignFeedbackFile)
      .where(eq(assignFeedbackFiles.id, assignFeedbackFileId!))
      .returning();
    return { assignFeedbackFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignFeedbackFile = async (id: AssignFeedbackFileId) => {
  const { id: assignFeedbackFileId } = assignFeedbackFileIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignFeedbackFiles)
      .where(eq(assignFeedbackFiles.id, assignFeedbackFileId!))
      .returning();
    return { assignFeedbackFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
