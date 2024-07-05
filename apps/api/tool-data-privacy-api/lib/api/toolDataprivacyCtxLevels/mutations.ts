import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../../db/index";
import {
  insertToolDataprivacyCtxLevelSchema,
  NewToolDataprivacyCtxLevelParams,
  ToolDataprivacyCtxLevelId,
  toolDataprivacyCtxLevelIdSchema,
  toolDataprivacyCtxLevels,
  UpdateToolDataprivacyCtxLevelParams,
  updateToolDataprivacyCtxLevelSchema,
} from "../../db/schema/toolDataprivacyCtxLevels";

export const createToolDataprivacyCtxLevel = async (
  toolDataprivacyCtxLevel: NewToolDataprivacyCtxLevelParams,
) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyCtxLevel = insertToolDataprivacyCtxLevelSchema.parse({
    ...toolDataprivacyCtxLevel,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(toolDataprivacyCtxLevels)
      .values(newToolDataprivacyCtxLevel)
      .returning();
    return { toolDataprivacyCtxLevel: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyCtxLevel = async (
  id: ToolDataprivacyCtxLevelId,
  toolDataprivacyCtxLevel: UpdateToolDataprivacyCtxLevelParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxLevelId } =
    toolDataprivacyCtxLevelIdSchema.parse({ id });
  const newToolDataprivacyCtxLevel = updateToolDataprivacyCtxLevelSchema.parse({
    ...toolDataprivacyCtxLevel,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(toolDataprivacyCtxLevels)
      .set({ ...newToolDataprivacyCtxLevel, updatedAt: new Date() })
      .where(
        and(
          eq(toolDataprivacyCtxLevels.id, toolDataprivacyCtxLevelId!),
          eq(toolDataprivacyCtxLevels.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyCtxLevel: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyCtxLevel = async (
  id: ToolDataprivacyCtxLevelId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyCtxLevelId } =
    toolDataprivacyCtxLevelIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolDataprivacyCtxLevels)
      .where(
        and(
          eq(toolDataprivacyCtxLevels.id, toolDataprivacyCtxLevelId!),
          eq(toolDataprivacyCtxLevels.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyCtxLevel: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
