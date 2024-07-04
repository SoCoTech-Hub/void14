import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { ToolPolicyVersionId } from "../db/schema/toolPolicyVersions";
import { db } from "../db/index";
import { toolPolicies } from "../db/schema/toolPolicies";
import {
  toolPolicyVersionIdSchema,
  toolPolicyVersions,
} from "../db/schema/toolPolicyVersions";

export const getToolPolicyVersions = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select({ toolPolicyVersion: toolPolicyVersions, toolPolicy: toolPolicies })
    .from(toolPolicyVersions)
    .leftJoin(
      toolPolicies,
      eq(toolPolicyVersions.toolPolicyId, toolPolicies.id),
    )
    .where(eq(toolPolicyVersions.userId, session?.user.id!));
  const t = rows.map((r) => ({
    ...r.toolPolicyVersion,
    toolPolicy: r.toolPolicy,
  }));
  return { toolPolicyVersions: t };
};

export const getToolPolicyVersionById = async (id: ToolPolicyVersionId) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyVersionId } = toolPolicyVersionIdSchema.parse({ id });
  const [row] = await db
    .select({ toolPolicyVersion: toolPolicyVersions, toolPolicy: toolPolicies })
    .from(toolPolicyVersions)
    .where(
      and(
        eq(toolPolicyVersions.id, toolPolicyVersionId),
        eq(toolPolicyVersions.userId, session?.user.id!),
      ),
    )
    .leftJoin(
      toolPolicies,
      eq(toolPolicyVersions.toolPolicyId, toolPolicies.id),
    );
  if (row === undefined) return {};
  const t = { ...row.toolPolicyVersion, toolPolicy: row.toolPolicy };
  return { toolPolicyVersion: t };
};
