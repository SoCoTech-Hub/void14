import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/tool-data-privacy-db";
import { db } from "@soco/tool-data-privacy-db/client";
import {
  insertToolDataprivacyCtxExpiredSchema,
  NewToolDataprivacyCtxExpiredParams,
  ToolDataprivacyCtxExpiredId,
  toolDataprivacyCtxExpiredIdSchema,
  toolDataprivacyCtxExpireds,
  UpdateToolDataprivacyCtxExpiredParams,
  updateToolDataprivacyCtxExpiredSchema,
} from "@soco/tool-data-privacy-db/schema/toolDataprivacyCtxExpireds";

export const createToolDataprivacyCtxExpired = async (
  toolDataprivacyCtxExpired: NewToolDataprivacyCtxExpiredParams,
) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyCtxExpired =
    insertToolDataprivacyCtxExpiredSchema.parse({
      ...toolDataprivacyCtxExpired,
      userId: session?.user.id!,
    });
  try {
    const [t] = await db
      .insert(toolDataprivacyCtxExpireds)
      .values(newToolDataprivacyCtxExpired)
      .returning();
    return { toolDataprivacyCtxExpired: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyCtxExpired = async (
  id: ToolDataprivacyCtxExpiredId,
  toolDataprivacyCtxExpired: UpdateToolDataprivacyCtxExpiredParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxExpiredId } =
    toolDataprivacyCtxExpiredIdSchema.parse({ id });
  const newToolDataprivacyCtxExpired =
    updateToolDataprivacyCtxExpiredSchema.parse({
      ...toolDataprivacyCtxExpired,
      userId: session?.user.id!,
    });
  try {
    const [t] = await db
      .update(toolDataprivacyCtxExpireds)
      .set({ ...newToolDataprivacyCtxExpired, updatedAt: new Date() })
      .where(
        and(
          eq(toolDataprivacyCtxExpireds.id, toolDataprivacyCtxExpiredId!),
          eq(toolDataprivacyCtxExpireds.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyCtxExpired: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyCtxExpired = async (
  id: ToolDataprivacyCtxExpiredId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxExpiredId } =
    toolDataprivacyCtxExpiredIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolDataprivacyCtxExpireds)
      .where(
        and(
          eq(toolDataprivacyCtxExpireds.id, toolDataprivacyCtxExpiredId!),
          eq(toolDataprivacyCtxExpireds.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyCtxExpired: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
