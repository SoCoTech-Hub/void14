import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertUserPreferenceSchema,
  NewUserPreferenceParams,
  UpdateUserPreferenceParams,
  updateUserPreferenceSchema,
  UserPreferenceId,
  userPreferenceIdSchema,
  userPreferences,
} from "../../db/schema/userPreferences";

export const createUserPreference = async (
  userPreference: NewUserPreferenceParams,
) => {
  const { session } = await getUserAuth();
  const newUserPreference = insertUserPreferenceSchema.parse({
    ...userPreference,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .insert(userPreferences)
      .values(newUserPreference)
      .returning();
    return { userPreference: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserPreference = async (
  id: UserPreferenceId,
  userPreference: UpdateUserPreferenceParams,
) => {
  const { session } = await getUserAuth();
  const { id: userPreferenceId } = userPreferenceIdSchema.parse({ id });
  const newUserPreference = updateUserPreferenceSchema.parse({
    ...userPreference,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .update(userPreferences)
      .set(newUserPreference)
      .where(
        and(
          eq(userPreferences.id, userPreferenceId!),
          eq(userPreferences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userPreference: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserPreference = async (id: UserPreferenceId) => {
  const { session } = await getUserAuth();
  const { id: userPreferenceId } = userPreferenceIdSchema.parse({ id });
  try {
    const [u] = await db
      .delete(userPreferences)
      .where(
        and(
          eq(userPreferences.id, userPreferenceId!),
          eq(userPreferences.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userPreference: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
