import { eq } from "drizzle-orm";

import type { ToolPolicyId } from "../../db/schema/toolPolicies";
import { db } from "../../db/index";
import { toolPolicies, toolPolicyIdSchema } from "../../db/schema/toolPolicies";

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
