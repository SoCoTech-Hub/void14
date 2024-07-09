import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/external-db/index";
import {
  ExternalServicesUserId,
  externalServicesUserIdSchema,
  externalServicesUsers,
  insertExternalServicesUserSchema,
  NewExternalServicesUserParams,
  UpdateExternalServicesUserParams,
  updateExternalServicesUserSchema,
} from "@soco/external-db/schema/externalServicesUsers";

export const createExternalServicesUser = async (
  externalServicesUser: NewExternalServicesUserParams,
) => {
  const { session } = await getUserAuth();
  const newExternalServicesUser = insertExternalServicesUserSchema.parse({
    ...externalServicesUser,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .insert(externalServicesUsers)
      .values(newExternalServicesUser)
      .returning();
    return { externalServicesUser: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateExternalServicesUser = async (
  id: ExternalServicesUserId,
  externalServicesUser: UpdateExternalServicesUserParams,
) => {
  const { session } = await getUserAuth();
  const { id: externalServicesUserId } = externalServicesUserIdSchema.parse({
    id,
  });
  const newExternalServicesUser = updateExternalServicesUserSchema.parse({
    ...externalServicesUser,
    userId: session?.user.id!,
  });
  try {
    const [e] = await db
      .update(externalServicesUsers)
      .set({ ...newExternalServicesUser, updatedAt: new Date() })
      .where(
        and(
          eq(externalServicesUsers.id, externalServicesUserId!),
          eq(externalServicesUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { externalServicesUser: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteExternalServicesUser = async (
  id: ExternalServicesUserId,
) => {
  const { session } = await getUserAuth();
  const { id: externalServicesUserId } = externalServicesUserIdSchema.parse({
    id,
  });
  try {
    const [e] = await db
      .delete(externalServicesUsers)
      .where(
        and(
          eq(externalServicesUsers.id, externalServicesUserId!),
          eq(externalServicesUsers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { externalServicesUser: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
