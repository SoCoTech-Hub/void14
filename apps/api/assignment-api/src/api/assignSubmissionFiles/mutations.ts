import type {
  AssignSubmissionFileId,
  NewAssignSubmissionFileParams,
  UpdateAssignSubmissionFileParams,
} from "@soco/assignment-db/schema/assignSubmissionFiles";
import { eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignSubmissionFileIdSchema,
  assignSubmissionFiles,
  insertAssignSubmissionFileSchema,
  updateAssignSubmissionFileSchema,
} from "@soco/assignment-db/schema/assignSubmissionFiles";

export const createAssignSubmissionFile = async (
  assignSubmissionFile: NewAssignSubmissionFileParams,
) => {
  const newAssignSubmissionFile =
    insertAssignSubmissionFileSchema.parse(assignSubmissionFile);
  try {
    const [a] = await db
      .insert(assignSubmissionFiles)
      .values(newAssignSubmissionFile)
      .returning();
    return { assignSubmissionFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignSubmissionFile = async (
  id: AssignSubmissionFileId,
  assignSubmissionFile: UpdateAssignSubmissionFileParams,
) => {
  const { id: assignSubmissionFileId } = assignSubmissionFileIdSchema.parse({
    id,
  });
  const newAssignSubmissionFile =
    updateAssignSubmissionFileSchema.parse(assignSubmissionFile);
  try {
    const [a] = await db
      .update(assignSubmissionFiles)
      .set(newAssignSubmissionFile)
      .where(eq(assignSubmissionFiles.id, assignSubmissionFileId!))
      .returning();
    return { assignSubmissionFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignSubmissionFile = async (
  id: AssignSubmissionFileId,
) => {
  const { id: assignSubmissionFileId } = assignSubmissionFileIdSchema.parse({
    id,
  });
  try {
    const [a] = await db
      .delete(assignSubmissionFiles)
      .where(eq(assignSubmissionFiles.id, assignSubmissionFileId!))
      .returning();
    return { assignSubmissionFile: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
