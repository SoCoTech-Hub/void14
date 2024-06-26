import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type ToolDataprivacyPurposeRoleId, toolDataprivacyPurposeRoleIdSchema, toolDataprivacyPurposeRoles } from "@/lib/db/schema/toolDataprivacyPurposeRoles";
import { toolDataprivacyPurposes } from "@/lib/db/schema/toolDataprivacyPurposes";

export const getToolDataprivacyPurposeRoles = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ toolDataprivacyPurposeRole: toolDataprivacyPurposeRoles, toolDataprivacyPurpose: toolDataprivacyPurposes }).from(toolDataprivacyPurposeRoles).leftJoin(toolDataprivacyPurposes, eq(toolDataprivacyPurposeRoles.toolDataprivacyPurposeId, toolDataprivacyPurposes.id)).where(eq(toolDataprivacyPurposeRoles.userId, session?.user.id!));
  const t = rows .map((r) => ({ ...r.toolDataprivacyPurposeRole, toolDataprivacyPurpose: r.toolDataprivacyPurpose})); 
  return { toolDataprivacyPurposeRoles: t };
};

export const getToolDataprivacyPurposeRoleById = async (id: ToolDataprivacyPurposeRoleId) => {
  const { session } = await getUserAuth();
  const { id: toolDataprivacyPurposeRoleId } = toolDataprivacyPurposeRoleIdSchema.parse({ id });
  const [row] = await db.select({ toolDataprivacyPurposeRole: toolDataprivacyPurposeRoles, toolDataprivacyPurpose: toolDataprivacyPurposes }).from(toolDataprivacyPurposeRoles).where(and(eq(toolDataprivacyPurposeRoles.id, toolDataprivacyPurposeRoleId), eq(toolDataprivacyPurposeRoles.userId, session?.user.id!))).leftJoin(toolDataprivacyPurposes, eq(toolDataprivacyPurposeRoles.toolDataprivacyPurposeId, toolDataprivacyPurposes.id));
  if (row === undefined) return {};
  const t =  { ...row.toolDataprivacyPurposeRole, toolDataprivacyPurpose: row.toolDataprivacyPurpose } ;
  return { toolDataprivacyPurposeRole: t };
};


