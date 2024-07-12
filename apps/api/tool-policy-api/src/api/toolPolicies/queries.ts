import type { ToolPolicyId } from "@soco/tool-policy-db/schema/toolPolicies";
import { eq } from "@soco/tool-policy-db";
import { db } from "@soco/tool-policy-db/client";
import {
  toolPolicies,
  toolPolicyIdSchema,
} from "@soco/tool-policy-db/schema/toolPolicies";

export const getToolPolicies = async () => {
  const rows = await db.select().from(toolPolicies);
  const t = rows;
  return { toolPolicies: t };
};

export const getToolPolicyById = async (id: ToolPolicyId) => {
  const { id: toolPolicyId } = toolPolicyIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(toolPolicies)
    .where(eq(toolPolicies.id, toolPolicyId));
  if (row === undefined) return {};
  const t = row;
  return { toolPolicy: t };
};
