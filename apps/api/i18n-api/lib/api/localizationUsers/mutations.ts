import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertLocalizationUserSchema,
  LocalizationUserId,
  localizationUserIdSchema,
  localizationUsers,
  NewLocalizationUserParams,
  UpdateLocalizationUserParams,
  updateLocalizationUserSchema,
} from "../../db/schema/localizationUsers";

export const createLocalizationUser = async (
  localizationUser: NewLocalizationUserParams,
) => {
  const { session } = await getUserAuth();
  const newLocalizationUser = insertLocalizationUserSchema.parse({
    ...localizationUser,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .insert(localizationUsers)
      .values(newLocalizationUser)
      .returning();
    return { localizationUser: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateLocalizationUser = async (
  id: LocalizationUserId,
  localizationUser: UpdateLocalizationUserParams,
) => {
  const { session } = await getUserAuth();
  const { id: localizationUserId } = localizationUserIdSchema.parse({ id });
  const newLocalizationUser = updateLocalizationUserSchema.parse({
    ...localizationUser,
    userId: session?.user.id!,
  });
  try {
    const [l] = await db
      .update(localizationUsers)
      .set(newLocalizationUser)
      .where(
        and(
          eq(localizationUsers.id, localizationUserId!),
          eq(localizationUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { localizationUser: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteLocalizationUser = async (id: LocalizationUserId) => {
  const { session } = await getUserAuth();
  const { id: localizationUserId } = localizationUserIdSchema.parse({ id });
  try {
    const [l] = await db
      .delete(localizationUsers)
      .where(
        and(
          eq(localizationUsers.id, localizationUserId!),
          eq(localizationUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { localizationUser: l };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
