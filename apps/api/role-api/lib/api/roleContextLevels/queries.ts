import { eq } from "drizzle-orm";

import type { RoleContextLevelId } from "../db/schema/roleContextLevels";
import { db } from "../db/index";
import {
  roleContextLevelIdSchema,
  roleContextLevels,
} from "../db/schema/roleContextLevels";
import { roles } from "../db/schema/roles";

export const getRoleContextLevels = async () => {
  const rows = await db
    .select({ roleContextLevel: roleContextLevels, role: roles })
    .from(roleContextLevels)
    .leftJoin(roles, eq(roleContextLevels.roleId, roles.id));
  const r = rows.map((r) => ({ ...r.roleContextLevel, role: r.role }));
  return { roleContextLevels: r };
};

export const getRoleContextLevelById = async (id: RoleContextLevelId) => {
  const { id: roleContextLevelId } = roleContextLevelIdSchema.parse({ id });
  const [row] = await db
    .select({ roleContextLevel: roleContextLevels, role: roles })
    .from(roleContextLevels)
    .where(eq(roleContextLevels.id, roleContextLevelId))
    .leftJoin(roles, eq(roleContextLevels.roleId, roles.id));
  if (row === undefined) return {};
  const r = { ...row.roleContextLevel, role: row.role };
  return { roleContextLevel: r };
};
