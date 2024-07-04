import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  AssignSubmissionId,
  assignSubmissionIdSchema,
  assignSubmissions,
  insertAssignSubmissionSchema,
  NewAssignSubmissionParams,
  UpdateAssignSubmissionParams,
  updateAssignSubmissionSchema,
} from "../db/schema/assignSubmissions";

export const createAssignSubmission = async (
  assignSubmission: NewAssignSubmissionParams,
) => {
  const { session } = await getUserAuth();
  const newAssignSubmission = insertAssignSubmissionSchema.parse({
    ...assignSubmission,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(assignSubmissions)
      .values(newAssignSubmission)
      .returning();
    return { assignSubmission: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignSubmission = async (
  id: AssignSubmissionId,
  assignSubmission: UpdateAssignSubmissionParams,
) => {
  const { session } = await getUserAuth();
  const { id: assignSubmissionId } = assignSubmissionIdSchema.parse({ id });
  const newAssignSubmission = updateAssignSubmissionSchema.parse({
    ...assignSubmission,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(assignSubmissions)
      .set({ ...newAssignSubmission, updatedAt: new Date() })
      .where(
        and(
          eq(assignSubmissions.id, assignSubmissionId!),
          eq(assignSubmissions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignSubmission: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignSubmission = async (id: AssignSubmissionId) => {
  const { session } = await getUserAuth();
  const { id: assignSubmissionId } = assignSubmissionIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignSubmissions)
      .where(
        and(
          eq(assignSubmissions.id, assignSubmissionId!),
          eq(assignSubmissions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignSubmission: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
