import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  RepositoryOnedriveAccessId, 
  NewRepositoryOnedriveAccessParams,
  UpdateRepositoryOnedriveAccessParams, 
  updateRepositoryOnedriveAccessSchema,
  insertRepositoryOnedriveAccessSchema, 
  repositoryOnedriveAccesses,
  repositoryOnedriveAccessIdSchema 
} from "@/lib/db/schema/repositoryOnedriveAccesses";
import { getUserAuth } from "@/lib/auth/utils";

export const createRepositoryOnedriveAccess = async (repositoryOnedriveAccess: NewRepositoryOnedriveAccessParams) => {
  const { session } = await getUserAuth();
  const newRepositoryOnedriveAccess = insertRepositoryOnedriveAccessSchema.parse({ ...repositoryOnedriveAccess, userId: session?.user.id! });
  try {
    const [r] =  await db.insert(repositoryOnedriveAccesses).values(newRepositoryOnedriveAccess).returning();
    return { repositoryOnedriveAccess: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRepositoryOnedriveAccess = async (id: RepositoryOnedriveAccessId, repositoryOnedriveAccess: UpdateRepositoryOnedriveAccessParams) => {
  const { session } = await getUserAuth();
  const { id: repositoryOnedriveAccessId } = repositoryOnedriveAccessIdSchema.parse({ id });
  const newRepositoryOnedriveAccess = updateRepositoryOnedriveAccessSchema.parse({ ...repositoryOnedriveAccess, userId: session?.user.id! });
  try {
    const [r] =  await db
     .update(repositoryOnedriveAccesses)
     .set({...newRepositoryOnedriveAccess, updatedAt: new Date() })
     .where(and(eq(repositoryOnedriveAccesses.id, repositoryOnedriveAccessId!), eq(repositoryOnedriveAccesses.userId, session?.user.id!)))
     .returning();
    return { repositoryOnedriveAccess: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRepositoryOnedriveAccess = async (id: RepositoryOnedriveAccessId) => {
  const { session } = await getUserAuth();
  const { id: repositoryOnedriveAccessId } = repositoryOnedriveAccessIdSchema.parse({ id });
  try {
    const [r] =  await db.delete(repositoryOnedriveAccesses).where(and(eq(repositoryOnedriveAccesses.id, repositoryOnedriveAccessId!), eq(repositoryOnedriveAccesses.userId, session?.user.id!)))
    .returning();
    return { repositoryOnedriveAccess: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

