import type {
  NewToolPolicyVersionParams,
  ToolPolicyVersionId,
  UpdateToolPolicyVersionParams,
} from "@soco/tool-policy-db/schema/toolPolicyVersions";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/tool-policy-db";
import { db } from "@soco/tool-policy-db/client";
import {
  insertToolPolicyVersionSchema,
  toolPolicyVersionIdSchema,
  toolPolicyVersions,
  updateToolPolicyVersionSchema,
} from "@soco/tool-policy-db/schema/toolPolicyVersions";

export const createToolPolicyVersion = async (
  toolPolicyVersion: NewToolPolicyVersionParams,
) => {
  const { session } = await getUserAuth();
  const newToolPolicyVersion = insertToolPolicyVersionSchema.parse({
    ...toolPolicyVersion,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .insert(toolPolicyVersions)
      .values(newToolPolicyVersion)
      .returning();
    return { toolPolicyVersion: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolPolicyVersion = async (
  id: ToolPolicyVersionId,
  toolPolicyVersion: UpdateToolPolicyVersionParams,
) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyVersionId } = toolPolicyVersionIdSchema.parse({ id });
  const newToolPolicyVersion = updateToolPolicyVersionSchema.parse({
    ...toolPolicyVersion,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(toolPolicyVersions)
      .set({ ...newToolPolicyVersion, updatedAt: new Date() })
      .where(
        and(
          eq(toolPolicyVersions.id, toolPolicyVersionId!),
          eq(toolPolicyVersions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolPolicyVersion: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolPolicyVersion = async (id: ToolPolicyVersionId) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyVersionId } = toolPolicyVersionIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolPolicyVersions)
      .where(
        and(
          eq(toolPolicyVersions.id, toolPolicyVersionId!),
          eq(toolPolicyVersions.userId, session?.user.id!),
        ),
      )
      .returning();
    return { toolPolicyVersion: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
