import type { ContextTempId } from "@soco/context-db/schema/contextTemp";
import { db, eq } from "@soco/context-db";
import { contexts } from "@soco/context-db/schema/contexts";
import {
  contextTemp,
  contextTempIdSchema,
} from "@soco/context-db/schema/contextTemp";

export const getContextTemps = async () => {
  const rows = await db
    .select({ contextTemp: contextTemp, context: contexts })
    .from(contextTemp)
    .leftJoin(contexts, eq(contextTemp.contextId, contexts.id));
  const c = rows.map((r) => ({ ...r.contextTemp, context: r.context }));
  return { contextTemp: c };
};

export const getContextTempById = async (id: ContextTempId) => {
  const { id: contextTempId } = contextTempIdSchema.parse({ id });
  const [row] = await db
    .select({ contextTemp: contextTemp, context: contexts })
    .from(contextTemp)
    .where(eq(contextTemp.id, contextTempId))
    .leftJoin(contexts, eq(contextTemp.contextId, contexts.id));
  if (row === undefined) return {};
  const c = { ...row.contextTemp, context: row.context };
  return { contextTemp: c };
};
