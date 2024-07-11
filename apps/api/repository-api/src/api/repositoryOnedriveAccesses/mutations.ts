import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/repository-db";
import { db } from "@soco/repository-db/client";
import {
  insertRepositoryOnedriveAccessSchema,
  NewRepositoryOnedriveAccessParams,
  repositoryOnedriveAccesses,
  RepositoryOnedriveAccessId,
  repositoryOnedriveAccessIdSchema,
  UpdateRepositoryOnedriveAccessParams,
  updateRepositoryOnedriveAccessSchema,
} from "@soco/repository-db/schema/repositoryOnedriveAccesses";

export const createRepositoryOnedriveAccess = async (
  repositoryOnedriveAccess: NewRepositoryOnedriveAccessParams,
) => {
  const { session } = await getUserAuth();
  const newRepositoryOnedriveAccess =
    insertRepositoryOnedriveAccessSchema.parse({
      ...repositoryOnedriveAccess,
      userId: session?.user.id!,
    });
  try {
    const [r] = await db
      .insert(repositoryOnedriveAccesses)
      .values(newRepositoryOnedriveAccess)
      .returning();
    return { repositoryOnedriveAccess: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRepositoryOnedriveAccess = async (
  id: RepositoryOnedriveAccessId,
  repositoryOnedriveAccess: UpdateRepositoryOnedriveAccessParams,
) => {
  const { session } = await getUserAuth();
  const { id: repositoryOnedriveAccessId } =
    repositoryOnedriveAccessIdSchema.parse({ id });
  const newRepositoryOnedriveAccess =
    updateRepositoryOnedriveAccessSchema.parse({
      ...repositoryOnedriveAccess,
      userId: session?.user.id!,
    });
  try {
    const [r] = await db
      .update(repositoryOnedriveAccesses)
      .set({ ...newRepositoryOnedriveAccess, updatedAt: new Date() })
      .where(
        and(
          eq(repositoryOnedriveAccesses.id, repositoryOnedriveAccessId!),
          eq(repositoryOnedriveAccesses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { repositoryOnedriveAccess: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRepositoryOnedriveAccess = async (
  id: RepositoryOnedriveAccessId,
) => {
  const { session } = await getUserAuth();
  const { id: repositoryOnedriveAccessId } =
    repositoryOnedriveAccessIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(repositoryOnedriveAccesses)
      .where(
        and(
          eq(repositoryOnedriveAccesses.id, repositoryOnedriveAccessId!),
          eq(repositoryOnedriveAccesses.userId, session?.user.id!),
        ),
      )
      .returning();
    return { repositoryOnedriveAccess: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
