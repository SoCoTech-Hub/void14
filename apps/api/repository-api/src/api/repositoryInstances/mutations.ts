import type {
  NewRepositoryInstanceParams,
  RepositoryInstanceId,
  UpdateRepositoryInstanceParams,
} from "@soco/repository-db/schema/repositoryInstances";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/repository-db";
import { db } from "@soco/repository-db/client";
import {
  insertRepositoryInstanceSchema,
  repositoryInstanceIdSchema,
  repositoryInstances,
  updateRepositoryInstanceSchema,
} from "@soco/repository-db/schema/repositoryInstances";

export const createRepositoryInstance = async (
  repositoryInstance: NewRepositoryInstanceParams,
) => {
  const { session } = await getUserAuth();
  const newRepositoryInstance = insertRepositoryInstanceSchema.parse({
    ...repositoryInstance,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .insert(repositoryInstances)
      .values(newRepositoryInstance)
      .returning();
    return { repositoryInstance: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRepositoryInstance = async (
  id: RepositoryInstanceId,
  repositoryInstance: UpdateRepositoryInstanceParams,
) => {
  const { session } = await getUserAuth();
  const { id: repositoryInstanceId } = repositoryInstanceIdSchema.parse({ id });
  const newRepositoryInstance = updateRepositoryInstanceSchema.parse({
    ...repositoryInstance,
    userId: session?.user.id!,
  });
  try {
    const [r] = await db
      .update(repositoryInstances)
      .set({ ...newRepositoryInstance, updatedAt: new Date() })
      .where(
        and(
          eq(repositoryInstances.id, repositoryInstanceId!),
          eq(repositoryInstances.userId, session?.user.id!),
        ),
      )
      .returning();
    return { repositoryInstance: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRepositoryInstance = async (id: RepositoryInstanceId) => {
  const { session } = await getUserAuth();
  const { id: repositoryInstanceId } = repositoryInstanceIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(repositoryInstances)
      .where(
        and(
          eq(repositoryInstances.id, repositoryInstanceId!),
          eq(repositoryInstances.userId, session?.user.id!),
        ),
      )
      .returning();
    return { repositoryInstance: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
