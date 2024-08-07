import type {
  NewUserPasswordHistoryParams,
  UpdateUserPasswordHistoryParams,
  UserPasswordHistoryId,
} from "@soco/user-db/schema/userPasswordHistories";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/user-db";
import { db } from "@soco/user-db/client";
import {
  insertUserPasswordHistorySchema,
  updateUserPasswordHistorySchema,
  userPasswordHistories,
  userPasswordHistoryIdSchema,
} from "@soco/user-db/schema/userPasswordHistories";

export const createUserPasswordHistory = async (
  userPasswordHistory: NewUserPasswordHistoryParams,
) => {
  const { session } = await getUserAuth();
  const newUserPasswordHistory = insertUserPasswordHistorySchema.parse({
    ...userPasswordHistory,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .insert(userPasswordHistories)
      .values(newUserPasswordHistory)
      .returning();
    return { userPasswordHistory: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserPasswordHistory = async (
  id: UserPasswordHistoryId,
  userPasswordHistory: UpdateUserPasswordHistoryParams,
) => {
  const { session } = await getUserAuth();
  const { id: userPasswordHistoryId } = userPasswordHistoryIdSchema.parse({
    id,
  });
  const newUserPasswordHistory = updateUserPasswordHistorySchema.parse({
    ...userPasswordHistory,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .update(userPasswordHistories)
      .set({ ...newUserPasswordHistory, updatedAt: new Date() })
      .where(
        and(
          eq(userPasswordHistories.id, userPasswordHistoryId!),
          eq(userPasswordHistories.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userPasswordHistory: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserPasswordHistory = async (id: UserPasswordHistoryId) => {
  const { session } = await getUserAuth();
  const { id: userPasswordHistoryId } = userPasswordHistoryIdSchema.parse({
    id,
  });
  try {
    const [u] = await db
      .delete(userPasswordHistories)
      .where(
        and(
          eq(userPasswordHistories.id, userPasswordHistoryId!),
          eq(userPasswordHistories.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userPasswordHistory: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
