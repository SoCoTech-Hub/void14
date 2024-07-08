import { db } from "@soco/role-db/index";
import { eq } from "drizzle-orm";
import { type RoleId, roleIdSchema, roles } from "@soco/role-db/schema/roles";

export const getRoles = async () => {
  const rows = await db.select().from(roles);
  const r = rows
  return { roles: r };
};

export const getRoleById = async (id: RoleId) => {
  const { id: roleId } = roleIdSchema.parse({ id });
  const [row] = await db.select().from(roles).where(eq(roles.id, roleId));
  if (row === undefined) return {};
  const r = row;
  return { role: r };
};


