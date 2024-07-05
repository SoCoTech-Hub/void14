import { eq } from "drizzle-orm";

import type { RoleAllowAssignId } from "../../db/schema/roleAllowAssigns";
import { db } from "../../db/index";
import {
  roleAllowAssignIdSchema,
  roleAllowAssigns,
} from "../../db/schema/roleAllowAssigns";
import { roles } from "../../db/schema/roles";

export const getRoleAllowAssigns = async () => {
  const rows = await db
    .select({
      roleAllowAssign: roleAllowAssigns,
      role: roles,
      allowRole: roles,
    })
    .from(roleAllowAssigns)
    .leftJoin(roles, eq(roleAllowAssigns.roleId, roles.id))
    .leftJoin(roles, eq(roleAllowAssigns.allowRoleId, roles.id));
  const r = rows.map((r) => ({
    ...r.roleAllowAssign,
    role: r.role,
    allowRole: r.allowRole,
  }));
  return { roleAllowAssigns: r };
};

export const getRoleAllowAssignById = async (id: RoleAllowAssignId) => {
  const { id: roleAllowAssignId } = roleAllowAssignIdSchema.parse({ id });
  const [row] = await db
    .select({
      roleAllowAssign: roleAllowAssigns,
      role: roles,
      allowRole: roles,
    })
    .from(roleAllowAssigns)
    .where(eq(roleAllowAssigns.id, roleAllowAssignId))
    .leftJoin(roles, eq(roleAllowAssigns.roleId, roles.id))
    .leftJoin(roles, eq(roleAllowAssigns.allowRoleId, roles.id));
  if (row === undefined) return {};
  const r = {
    ...row.roleAllowAssign,
    role: row.role,
    allowRole: row.allowRole,
  };
  return { roleAllowAssign: r };
};
