import { db } from "@soco/tool-data-privacy-db/client";
import { eq, and } from "@soco/tool-data-privacy-db";
import { getUserAuth } from "@soco/auth-service";
import { type ToolDataprivacyCtxExpiredId, toolDataprivacyCtxExpiredIdSchema, toolDataprivacyCtxExpireds } from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxExpireds";

export const getToolDataprivacyCtxExpireds = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(toolDataprivacyCtxExpireds).where(eq(toolDataprivacyCtxExpireds.userId, session?.user.id!));
  const t = rows
  return { toolDataprivacyCtxExpireds: t };
};

export const getToolDataprivacyCtxExpiredById = async (id: ToolDataprivacyCtxExpiredId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxExpiredId } = toolDataprivacyCtxExpiredIdSchema.parse({ id });
  const [row] = await db.select().from(toolDataprivacyCtxExpireds).where(and(eq(toolDataprivacyCtxExpireds.id, toolDataprivacyCtxExpiredId), eq(toolDataprivacyCtxExpireds.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { toolDataprivacyCtxExpired: t };
};


