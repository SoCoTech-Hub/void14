import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  RepositoryInstanceId, 
  NewRepositoryInstanceParams,
  UpdateRepositoryInstanceParams, 
  updateRepositoryInstanceSchema,
  insertRepositoryInstanceSchema, 
  repositoryInstances,
  repositoryInstanceIdSchema 
} from "@/lib/db/schema/repositoryInstances";
import { getUserAuth } from "@soco/auth/utils";

export const createRepositoryInstance = async (repositoryInstance: NewRepositoryInstanceParams) => {
  const { session } = await getUserAuth();
  const newRepositoryInstance = insertRepositoryInstanceSchema.parse({ ...repositoryInstance, userId: session?.user.id! });
  try {
    const [r] =  await db.insert(repositoryInstances).values(newRepositoryInstance).returning();
    return { repositoryInstance: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRepositoryInstance = async (id: RepositoryInstanceId, repositoryInstance: UpdateRepositoryInstanceParams) => {
  const { session } = await getUserAuth();
  const { id: repositoryInstanceId } = repositoryInstanceIdSchema.parse({ id });
  const newRepositoryInstance = updateRepositoryInstanceSchema.parse({ ...repositoryInstance, userId: session?.user.id! });
  try {
    const [r] =  await db
     .update(repositoryInstances)
     .set({...newRepositoryInstance, updatedAt: new Date() })
     .where(and(eq(repositoryInstances.id, repositoryInstanceId!), eq(repositoryInstances.userId, session?.user.id!)))
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
    const [r] =  await db.delete(repositoryInstances).where(and(eq(repositoryInstances.id, repositoryInstanceId!), eq(repositoryInstances.userId, session?.user.id!)))
    .returning();
    return { repositoryInstance: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

