import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type RepositoryOnedriveAccessId, repositoryOnedriveAccessIdSchema, repositoryOnedriveAccesses } from "@/lib/db/schema/repositoryOnedriveAccesses";

export const getRepositoryOnedriveAccesses = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(repositoryOnedriveAccesses).where(eq(repositoryOnedriveAccesses.userId, session?.user.id!));
  const r = rows
  return { repositoryOnedriveAccesses: r };
};

export const getRepositoryOnedriveAccessById = async (id: RepositoryOnedriveAccessId) => {
  const { session } = await getUserAuth();
  const { id: repositoryOnedriveAccessId } = repositoryOnedriveAccessIdSchema.parse({ id });
  const [row] = await db.select().from(repositoryOnedriveAccesses).where(and(eq(repositoryOnedriveAccesses.id, repositoryOnedriveAccessId), eq(repositoryOnedriveAccesses.userId, session?.user.id!)));
  if (row === undefined) return {};
  const r = row;
  return { repositoryOnedriveAccess: r };
};


