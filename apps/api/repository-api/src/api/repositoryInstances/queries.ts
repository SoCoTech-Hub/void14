import { and, eq } from "drizzle-orm";

import type { RepositoryInstanceId } from "@soco/repository-db/schema/repositoryInstances";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/repository-db/index";
import {
  repositoryInstanceIdSchema,
  repositoryInstances,
} from "@soco/repository-db/schema/repositoryInstances";

export const getRepositoryInstances = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(repositoryInstances)
    .where(eq(repositoryInstances.userId, session?.user.id!));
  const r = rows;
  return { repositoryInstances: r };
};

export const getRepositoryInstanceById = async (id: RepositoryInstanceId) => {
  const { session } = await getUserAuth();
  const { id: repositoryInstanceId } = repositoryInstanceIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(repositoryInstances)
    .where(
      and(
        eq(repositoryInstances.id, repositoryInstanceId),
        eq(repositoryInstances.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const r = row;
  return { repositoryInstance: r };
};
