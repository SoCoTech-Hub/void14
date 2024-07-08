import { db } from "@soco/tool-policy-db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolPolicyVersionId, toolPolicyVersionIdSchema, toolPolicyVersions } from "@soco/tool-policy-db/schema/toolPolicyVersions";
import { toolPolicies } from "@soco/tool-policy-db/schema/toolPolicies";

export const getToolPolicyVersions = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ toolPolicyVersion: toolPolicyVersions, toolPolicy: toolPolicies }).from(toolPolicyVersions).leftJoin(toolPolicies, eq(toolPolicyVersions.toolPolicyId, toolPolicies.id)).where(eq(toolPolicyVersions.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.toolPolicyVersion, toolPolicy: r.toolPolicy})); 
  return { toolPolicyVersions: t };
};

export const getToolPolicyVersionById = async (id: ToolPolicyVersionId) => {
  const { session } = await getUserAuth();
  const { id: toolPolicyVersionId } = toolPolicyVersionIdSchema.parse({ id });
  const [row] = await db.select({ toolPolicyVersion: toolPolicyVersions, toolPolicy: toolPolicies }).from(toolPolicyVersions).where(and(eq(toolPolicyVersions.id, toolPolicyVersionId), eq(toolPolicyVersions.userId, session?.user.id!))).leftJoin(toolPolicies, eq(toolPolicyVersions.toolPolicyId, toolPolicies.id));
  if (row === undefined) return {};
  const t =  { ...row.toolPolicyVersion, toolPolicy: row.toolPolicy } ;
  return { toolPolicyVersion: t };
};


