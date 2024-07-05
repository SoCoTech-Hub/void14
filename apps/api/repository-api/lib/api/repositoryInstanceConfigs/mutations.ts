import { eq } from "drizzle-orm";

import { db } from "../../db/index";
import {
  insertRepositoryInstanceConfigSchema,
  NewRepositoryInstanceConfigParams,
  RepositoryInstanceConfigId,
  repositoryInstanceConfigIdSchema,
  repositoryInstanceConfigs,
  UpdateRepositoryInstanceConfigParams,
  updateRepositoryInstanceConfigSchema,
} from "../../db/schema/repositoryInstanceConfigs";

export const createRepositoryInstanceConfig = async (
  repositoryInstanceConfig: NewRepositoryInstanceConfigParams,
) => {
  const newRepositoryInstanceConfig =
    insertRepositoryInstanceConfigSchema.parse(repositoryInstanceConfig);
  try {
    const [r] = await db
      .insert(repositoryInstanceConfigs)
      .values(newRepositoryInstanceConfig)
      .returning();
    return { repositoryInstanceConfig: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRepositoryInstanceConfig = async (
  id: RepositoryInstanceConfigId,
  repositoryInstanceConfig: UpdateRepositoryInstanceConfigParams,
) => {
  const { id: repositoryInstanceConfigId } =
    repositoryInstanceConfigIdSchema.parse({ id });
  const newRepositoryInstanceConfig =
    updateRepositoryInstanceConfigSchema.parse(repositoryInstanceConfig);
  try {
    const [r] = await db
      .update(repositoryInstanceConfigs)
      .set(newRepositoryInstanceConfig)
      .where(eq(repositoryInstanceConfigs.id, repositoryInstanceConfigId!))
      .returning();
    return { repositoryInstanceConfig: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRepositoryInstanceConfig = async (
  id: RepositoryInstanceConfigId,
) => {
  const { id: repositoryInstanceConfigId } =
    repositoryInstanceConfigIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(repositoryInstanceConfigs)
      .where(eq(repositoryInstanceConfigs.id, repositoryInstanceConfigId!))
      .returning();
    return { repositoryInstanceConfig: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
