import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  AssignUserFlagId,
  assignUserFlagIdSchema,
  assignUserFlags,
  insertAssignUserFlagSchema,
  NewAssignUserFlagParams,
  UpdateAssignUserFlagParams,
  updateAssignUserFlagSchema,
} from "../db/schema/assignUserFlags";

export const createAssignUserFlag = async (
  assignUserFlag: NewAssignUserFlagParams,
) => {
  const { session } = await getUserAuth();
  const newAssignUserFlag = insertAssignUserFlagSchema.parse({
    ...assignUserFlag,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(assignUserFlags)
      .values(newAssignUserFlag)
      .returning();
    return { assignUserFlag: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAssignUserFlag = async (
  id: AssignUserFlagId,
  assignUserFlag: UpdateAssignUserFlagParams,
) => {
  const { session } = await getUserAuth();
  const { id: assignUserFlagId } = assignUserFlagIdSchema.parse({ id });
  const newAssignUserFlag = updateAssignUserFlagSchema.parse({
    ...assignUserFlag,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(assignUserFlags)
      .set(newAssignUserFlag)
      .where(
        and(
          eq(assignUserFlags.id, assignUserFlagId!),
          eq(assignUserFlags.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignUserFlag: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAssignUserFlag = async (id: AssignUserFlagId) => {
  const { session } = await getUserAuth();
  const { id: assignUserFlagId } = assignUserFlagIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(assignUserFlags)
      .where(
        and(
          eq(assignUserFlags.id, assignUserFlagId!),
          eq(assignUserFlags.userId, session?.user.id!),
        ),
      )
      .returning();
    return { assignUserFlag: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};