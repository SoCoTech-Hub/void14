import { db } from "@soco/context-db/index";
import { eq } from "drizzle-orm";
import { type ContextId, contextIdSchema, contexts } from "@soco/context-db/schema/contexts";

export const getContexts = async () => {
  const rows = await db.select().from(contexts);
  const c = rows
  return { contexts: c };
};

export const getContextById = async (id: ContextId) => {
  const { id: contextId } = contextIdSchema.parse({ id });
  const [row] = await db.select().from(contexts).where(eq(contexts.id, contextId));
  if (row === undefined) return {};
  const c = row;
  return { context: c };
};


