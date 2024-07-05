import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  AssignmentSubmissionId,
  assignmentSubmissionIdSchema,
  assignmentSubmissions,
  insertAssignmentSubmissionSchema,
  NewAssignmentSubmissionParams,
  UpdateAssignmentSubmissionParams,
  updateAssignmentSubmissionSchema,
} from "../../db/schema/assignmentSubmissions";

export const createAssignmentSubmission = async (
  assignmentSubmission: NewAssignmentSubmissionParams,
) => {
  const { session } = await getUserAuth();
  const newAssignmentSubmission = insertAssignmentSubmissionSchema.parse({
    ...assignmentSubmission,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(assignmentSubmissions)
      .values(newAssignmentSubmission)
      .returning();
    return { assignmentSubmission: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignmentSubmission = async (
  id: AssignmentSubmissionId,
  assignmentSubmission: UpdateAssignmentSubmissionParams,
) => {
  const { session } = await getUserAuth();
  const { id: assignmentSubmissionId } = assignmentSubmissionIdSchema.parse({
    id,
  });
  const newAssignmentSubmission = updateAssignmentSubmissionSchema.parse({
    ...assignmentSubmission,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(assignmentSubmissions)
      .set({ ...newAssignmentSubmission, updatedAt: new Date() })
      .where(
        and(
          eq(assignmentSubmissions.id, assignmentSubmissionId!),
          eq(assignmentSubmissions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignmentSubmission: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignmentSubmission = async (
  id: AssignmentSubmissionId,
) => {
  const { session } = await getUserAuth();
  const { id: assignmentSubmissionId } = assignmentSubmissionIdSchema.parse({
    id,
  });
  try {
    const [a] = await db
      .delete(assignmentSubmissions)
      .where(
        and(
          eq(assignmentSubmissions.id, assignmentSubmissionId!),
          eq(assignmentSubmissions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignmentSubmission: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
