import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertToolDataprivacyPurposeRoleSchema,
  NewToolDataprivacyPurposeRoleParams,
  ToolDataprivacyPurposeRoleId,
  toolDataprivacyPurposeRoleIdSchema,
  toolDataprivacyPurposeRoles,
  UpdateToolDataprivacyPurposeRoleParams,
  updateToolDataprivacyPurposeRoleSchema,
} from "../db/schema/toolDataprivacyPurposeRoles";

export const createToolDataprivacyPurposeRole = async (
  toolDataprivacyPurposeRole: NewToolDataprivacyPurposeRoleParams,
) => {
  const { session } = await getUserAuth();
  const newToolDataprivacyPurposeRole =
    insertToolDataprivacyPurposeRoleSchema.parse({
      ...toolDataprivacyPurposeRole,
      userId: session?.user.id!,
    });
  try {
    const [t] = await db
      .insert(toolDataprivacyPurposeRoles)
      .values(newToolDataprivacyPurposeRole)
      .returning();
    return { toolDataprivacyPurposeRole: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolDataprivacyPurposeRole = async (
  id: ToolDataprivacyPurposeRoleId,
  toolDataprivacyPurposeRole: UpdateToolDataprivacyPurposeRoleParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyPurposeRoleId } =
    toolDataprivacyPurposeRoleIdSchema.parse({ id });
  const newToolDataprivacyPurposeRole =
    updateToolDataprivacyPurposeRoleSchema.parse({
      ...toolDataprivacyPurposeRole,
      userId: session?.user.id!,
    });
  try {
    const [t] = await db
      .update(toolDataprivacyPurposeRoles)
      .set({ ...newToolDataprivacyPurposeRole, updatedAt: new Date() })
      .where(
        and(
          eq(toolDataprivacyPurposeRoles.id, toolDataprivacyPurposeRoleId!),
          eq(toolDataprivacyPurposeRoles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyPurposeRole: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolDataprivacyPurposeRole = async (
  id: ToolDataprivacyPurposeRoleId,
) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyPurposeRoleId } =
    toolDataprivacyPurposeRoleIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolDataprivacyPurposeRoles)
      .where(
        and(
          eq(toolDataprivacyPurposeRoles.id, toolDataprivacyPurposeRoleId!),
          eq(toolDataprivacyPurposeRoles.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolDataprivacyPurposeRole: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
