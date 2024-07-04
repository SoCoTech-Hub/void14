import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertToolPolicyAcceptanceSchema,
  NewToolPolicyAcceptanceParams,
  ToolPolicyAcceptanceId,
  toolPolicyAcceptanceIdSchema,
  toolPolicyAcceptances,
  UpdateToolPolicyAcceptanceParams,
  updateToolPolicyAcceptanceSchema,
} from "../db/schema/toolPolicyAcceptances";

export const createToolPolicyAcceptance = async (
  toolPolicyAcceptance: NewToolPolicyAcceptanceParams,
) => {
  const { session } = await getUserAuth();
  const newToolPolicyAcceptance = insertToolPolicyAcceptanceSchema.parse({
    ...toolPolicyAcceptance,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(toolPolicyAcceptances)
      .values(newToolPolicyAcceptance)
      .returning();
    return { toolPolicyAcceptance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolPolicyAcceptance = async (
  id: ToolPolicyAcceptanceId,
  toolPolicyAcceptance: UpdateToolPolicyAcceptanceParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyAcceptanceId } = toolPolicyAcceptanceIdSchema.parse({
    id,
  });
  const newToolPolicyAcceptance = updateToolPolicyAcceptanceSchema.parse({
    ...toolPolicyAcceptance,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(toolPolicyAcceptances)
      .set({ ...newToolPolicyAcceptance, updatedAt: new Date() })
      .where(
        and(
          eq(toolPolicyAcceptances.id, toolPolicyAcceptanceId!),
          eq(toolPolicyAcceptances.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolPolicyAcceptance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolPolicyAcceptance = async (
  id: ToolPolicyAcceptanceId,
) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyAcceptanceId } = toolPolicyAcceptanceIdSchema.parse({
    id,
  });
  try {
    const [t] = await db
      .delete(toolPolicyAcceptances)
      .where(
        and(
          eq(toolPolicyAcceptances.id, toolPolicyAcceptanceId!),
          eq(toolPolicyAcceptances.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolPolicyAcceptance: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};