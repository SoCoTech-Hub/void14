import { db } from "@soco/role-db/client";
import { eq, and } from "@soco/role-db";
import { getUserAuth } from "@soco/auth-service";
import { type RoleAssignmentId, roleAssignmentIdSchema, roleAssignments } from "@soco/role-db/schema/roleAssignments";
import { roles } from "@soco/role-db/schema/roles";

export const getRoleAssignments = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select({ roleAssignment: roleAssignments, role: roles }).from(roleAssignments).leftJoin(roles, eq(roleAssignments.roleId, roles.id)).where(eq(roleAssignments.userId, session?.user.id!));
  const r = rows .map((r) => ({ ...r.roleAssignment, role: r.role})); 
  return { roleAssignments: r };
};

export const getRoleAssignmentById = async (id: RoleAssignmentId) => {
  const { session } = await getUserAuth();
  const { id: roleAssignmentId } = roleAssignmentIdSchema.parse({ id });
  const [row] = await db.select({ roleAssignment: roleAssignments, role: roles }).from(roleAssignments).where(and(eq(roleAssignments.id, roleAssignmentId), eq(roleAssignments.userId, session?.user.id!))).leftJoin(roles, eq(roleAssignments.roleId, roles.id));
  if (row === undefined) return {};
  const r =  { ...row.roleAssignment, role: row.role } ;
  return { roleAssignment: r };
};


