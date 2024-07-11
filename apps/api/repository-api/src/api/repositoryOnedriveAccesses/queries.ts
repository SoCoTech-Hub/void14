import type { RepositoryOnedriveAccessId } from "@soco/repository-db/schema/repositoryOnedriveAccesses";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/repository-db";
import { db } from "@soco/repository-db/client";
import {
  repositoryOnedriveAccesses,
  repositoryOnedriveAccessIdSchema,
} from "@soco/repository-db/schema/repositoryOnedriveAccesses";

export const getRepositoryOnedriveAccesses = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(repositoryOnedriveAccesses)
    .where(eq(repositoryOnedriveAccesses.userId, session?.user.id!));
  const r = rows;
  return { repositoryOnedriveAccesses: r };
};

export const getRepositoryOnedriveAccessById = async (
  id: RepositoryOnedriveAccessId,
) => {
  const { session } = await getUserAuth();
  const { id: repositoryOnedriveAccessId } =
    repositoryOnedriveAccessIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(repositoryOnedriveAccesses)
    .where(
      and(
        eq(repositoryOnedriveAccesses.id, repositoryOnedriveAccessId),
        eq(repositoryOnedriveAccesses.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const r = row;
  return { repositoryOnedriveAccess: r };
};
