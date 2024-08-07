import type {
  AssignOverrideId,
  NewAssignOverrideParams,
  UpdateAssignOverrideParams,
} from "@soco/assignment-db/schema/assignOverrides";
import { and, eq } from "@soco/assignment-db";
import { db } from "@soco/assignment-db/client";
import {
  assignOverrideIdSchema,
  assignOverrides,
  insertAssignOverrideSchema,
  updateAssignOverrideSchema,
} from "@soco/assignment-db/schema/assignOverrides";
import { getUserAuth } from "@soco/auth-service";

export const createAssignOverride = async (
  assignOverride: NewAssignOverrideParams,
) => {
  const { session } = await getUserAuth();
  const newAssignOverride = insertAssignOverrideSchema.parse({
    ...assignOverride,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(assignOverrides)
      .values(newAssignOverride)
      .returning();
    return { assignOverride: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignOverride = async (
  id: AssignOverrideId,
  assignOverride: UpdateAssignOverrideParams,
) => {
  const { session } = await getUserAuth();
  const { id: assignOverrideId } = assignOverrideIdSchema.parse({ id });
  const newAssignOverride = updateAssignOverrideSchema.parse({
    ...assignOverride,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(assignOverrides)
      .set(newAssignOverride)
      .where(
        and(
          eq(assignOverrides.id, assignOverrideId!),
          eq(assignOverrides.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignOverride: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignOverride = async (id: AssignOverrideId) => {
  const { session } = await getUserAuth();
  const { id: assignOverrideId } = assignOverrideIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignOverrides)
      .where(
        and(
          eq(assignOverrides.id, assignOverrideId!),
          eq(assignOverrides.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignOverride: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
