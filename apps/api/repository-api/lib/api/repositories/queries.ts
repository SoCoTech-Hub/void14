import { eq } from "drizzle-orm";

import type { RepositoryId } from "../db/schema/repositories";
import { db } from "../db/index";
import { repositories, repositoryIdSchema } from "../db/schema/repositories";

export const getRepositories = async () => {
  const rows = await db.select().from(repositories);
  const r = rows;
  return { repositories: r };
};

export const getRepositoryById = async (id: RepositoryId) => {
  const { id: repositoryId } = repositoryIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(repositories)
    .where(eq(repositories.id, repositoryId));
  if (row === undefined) return {};
  const r = row;
  return { repository: r };
};
