import { db } from "@soco/repository-db/client";
import { eq } from "@soco/repository-db";
import { 
  RepositoryId, 
  NewRepositoryParams,
  UpdateRepositoryParams, 
  updateRepositorySchema,
  insertRepositorySchema, 
  repositories,
  repositoryIdSchema 
} from "@soco/repository-db/schema/repositories";

export const createRepository = async (repository: NewRepositoryParams) => {
  const newRepository = insertRepositorySchema.parse(repository);
  try {
    const [r] =  await db.insert(repositories).values(newRepository).returning();
    return { repository: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRepository = async (id: RepositoryId, repository: UpdateRepositoryParams) => {
  const { id: repositoryId } = repositoryIdSchema.parse({ id });
  const newRepository = updateRepositorySchema.parse(repository);
  try {
    const [r] =  await db
     .update(repositories)
     .set(newRepository)
     .where(eq(repositories.id, repositoryId!))
     .returning();
    return { repository: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRepository = async (id: RepositoryId) => {
  const { id: repositoryId } = repositoryIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(repositories).where(eq(repositories.id, repositoryId!))
    .returning();
    return { repository: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

