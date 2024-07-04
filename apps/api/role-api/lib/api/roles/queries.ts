import { eq } from "drizzle-orm";

import type { RoleId } from "../db/schema/roles";
import { db } from "../db/index";
import { roleIdSchema, roles } from "../db/schema/roles";

export const getRoles = async () => {
  const rows = await db.select().from(roles);
  const r = rows;
  return { roles: r };
};

export const getRoleById = async (id: RoleId) => {
  const { id: roleId } = roleIdSchema.parse({ id });
  const [row] = await db.select().from(roles).where(eq(roles.id, roleId));
  if (row === undefined) return {};
  const r = row;
  return { role: r };
};
