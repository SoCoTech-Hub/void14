import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertUserPrivateKeySchema,
  NewUserPrivateKeyParams,
  UpdateUserPrivateKeyParams,
  updateUserPrivateKeySchema,
  UserPrivateKeyId,
  userPrivateKeyIdSchema,
  userPrivateKeys,
} from "../db/schema/userPrivateKeys";

export const createUserPrivateKey = async (
  userPrivateKey: NewUserPrivateKeyParams,
) => {
  const { session } = await getUserAuth();
  const newUserPrivateKey = insertUserPrivateKeySchema.parse({
    ...userPrivateKey,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .insert(userPrivateKeys)
      .values(newUserPrivateKey)
      .returning();
    return { userPrivateKey: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateUserPrivateKey = async (
  id: UserPrivateKeyId,
  userPrivateKey: UpdateUserPrivateKeyParams,
) => {
  const { session } = await getUserAuth();
  const { id: userPrivateKeyId } = userPrivateKeyIdSchema.parse({ id });
  const newUserPrivateKey = updateUserPrivateKeySchema.parse({
    ...userPrivateKey,
    userId: session?.user.id!,
  });
  try {
    const [u] = await db
      .update(userPrivateKeys)
      .set({ ...newUserPrivateKey, updatedAt: new Date() })
      .where(
        and(
          eq(userPrivateKeys.id, userPrivateKeyId!),
          eq(userPrivateKeys.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userPrivateKey: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteUserPrivateKey = async (id: UserPrivateKeyId) => {
  const { session } = await getUserAuth();
  const { id: userPrivateKeyId } = userPrivateKeyIdSchema.parse({ id });
  try {
    const [u] = await db
      .delete(userPrivateKeys)
      .where(
        and(
          eq(userPrivateKeys.id, userPrivateKeyId!),
          eq(userPrivateKeys.userId, session?.user.id!),
        ),
      )
      .returning();
    return { userPrivateKey: u };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
