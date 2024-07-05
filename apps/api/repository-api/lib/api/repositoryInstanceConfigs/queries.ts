import { eq } from "drizzle-orm";

import type { RepositoryInstanceConfigId } from "../../db/schema/repositoryInstanceConfigs";
import { db } from "../../db/index";
import {
  repositoryInstanceConfigIdSchema,
  repositoryInstanceConfigs,
} from "../../db/schema/repositoryInstanceConfigs";
import { repositoryInstances } from "../../db/schema/repositoryInstances";

export const getRepositoryInstanceConfigs = async () => {
  const rows = await db
    .select({
      repositoryInstanceConfig: repositoryInstanceConfigs,
      repositoryInstance: repositoryInstances,
    })
    .from(repositoryInstanceConfigs)
    .leftJoin(
      repositoryInstances,
      eq(
        repositoryInstanceConfigs.repositoryInstanceId,
        repositoryInstances.id,
      ),
    );
  const r = rows.map((r) => ({
    ...r.repositoryInstanceConfig,
    repositoryInstance: r.repositoryInstance,
  }));
  return { repositoryInstanceConfigs: r };
};

export const getRepositoryInstanceConfigById = async (
  id: RepositoryInstanceConfigId,
) => {
  const { id: repositoryInstanceConfigId } =
    repositoryInstanceConfigIdSchema.parse({ id });
  const [row] = await db
    .select({
      repositoryInstanceConfig: repositoryInstanceConfigs,
      repositoryInstance: repositoryInstances,
    })
    .from(repositoryInstanceConfigs)
    .where(eq(repositoryInstanceConfigs.id, repositoryInstanceConfigId))
    .leftJoin(
      repositoryInstances,
      eq(
        repositoryInstanceConfigs.repositoryInstanceId,
        repositoryInstances.id,
      ),
    );
  if (row === undefined) return {};
  const r = {
    ...row.repositoryInstanceConfig,
    repositoryInstance: row.repositoryInstance,
  };
  return { repositoryInstanceConfig: r };
};
