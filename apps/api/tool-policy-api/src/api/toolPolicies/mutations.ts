import type {
  NewToolPolicyParams,
  ToolPolicyId,
  UpdateToolPolicyParams,
} from "@soco/tool-policy-db/schema/toolPolicies";
import { eq } from "@soco/tool-policy-db";
import { db } from "@soco/tool-policy-db/client";
import {
  insertToolPolicySchema,
  toolPolicies,
  toolPolicyIdSchema,
  updateToolPolicySchema,
} from "@soco/tool-policy-db/schema/toolPolicies";

export const createToolPolicy = async (toolPolicy: NewToolPolicyParams) => {
  const newToolPolicy = insertToolPolicySchema.parse(toolPolicy);
  try {
    const [t] = await db.insert(toolPolicies).values(newToolPolicy).returning();
    return { toolPolicy: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateToolPolicy = async (
  id: ToolPolicyId,
  toolPolicy: UpdateToolPolicyParams,
) => {
  const { id: toolPolicyId } = toolPolicyIdSchema.parse({ id });
  const newToolPolicy = updateToolPolicySchema.parse(toolPolicy);
  try {
    const [t] = await db
      .update(toolPolicies)
      .set(newToolPolicy)
      .where(eq(toolPolicies.id, toolPolicyId!))
      .returning();
    return { toolPolicy: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteToolPolicy = async (id: ToolPolicyId) => {
  const { id: toolPolicyId } = toolPolicyIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(toolPolicies)
      .where(eq(toolPolicies.id, toolPolicyId!))
      .returning();
    return { toolPolicy: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
