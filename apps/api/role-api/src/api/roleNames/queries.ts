import { db } from "@soco/role-db/client";
import { eq } from "@soco/role-db";
import { type RoleNameId, roleNameIdSchema, roleNames } from "@soco/role-db/schema/roleNames";
import { roles } from "@soco/role-db/schema/roles";

export const getRoleNames = async () => {
  const rows = await db.select({ roleName: roleNames, role: roles }).from(roleNames).leftJoin(roles, eq(roleNames.roleId, roles.id));
  const r = rows .map((r) => ({ ...r.roleName, role: r.role})); 
  return { roleNames: r };
};

export const getRoleNameById = async (id: RoleNameId) => {
  const { id: roleNameId } = roleNameIdSchema.parse({ id });
  const [row] = await db.select({ roleName: roleNames, role: roles }).from(roleNames).where(eq(roleNames.id, roleNameId)).leftJoin(roles, eq(roleNames.roleId, roles.id));
  if (row === undefined) return {};
  const r =  { ...row.roleName, role: row.role } ;
  return { roleName: r };
};


