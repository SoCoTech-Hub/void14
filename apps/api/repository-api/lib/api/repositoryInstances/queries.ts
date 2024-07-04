import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { RepositoryInstanceId } from "../db/schema/repositoryInstances";
import { db } from "../db/index";
import {
  repositoryInstanceIdSchema,
  repositoryInstances,
} from "../db/schema/repositoryInstances";

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
