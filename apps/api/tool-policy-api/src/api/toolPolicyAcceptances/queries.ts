import { and, eq } from "drizzle-orm";

import type { ToolPolicyAcceptanceId } from "@soco/tool-policy-db/schema/toolPolicyAcceptances";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/tool-policy-db/index";
import {
  toolPolicyAcceptanceIdSchema,
  toolPolicyAcceptances,
} from "@soco/tool-policy-db/schema/toolPolicyAcceptances";

export const getToolPolicyAcceptances = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(toolPolicyAcceptances)
    .where(eq(toolPolicyAcceptances.userId, session?.user.id!));
  const t = rows;
  return { toolPolicyAcceptances: t };
};

export const getToolPolicyAcceptanceById = async (
  id: ToolPolicyAcceptanceId,
) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyAcceptanceId } = toolPolicyAcceptanceIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(toolPolicyAcceptances)
    .where(
      and(
        eq(toolPolicyAcceptances.id, toolPolicyAcceptanceId),
        eq(toolPolicyAcceptances.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const t = row;
  return { toolPolicyAcceptance: t };
};
