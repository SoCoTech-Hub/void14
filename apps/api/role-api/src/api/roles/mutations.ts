import type {
  NewRoleParams,
  RoleId,
  UpdateRoleParams,
} from "@soco/role-db/schema/roles";
import { eq } from "@soco/role-db";
import { db } from "@soco/role-db/client";
import {
  insertRoleSchema,
  roleIdSchema,
  roles,
  updateRoleSchema,
} from "@soco/role-db/schema/roles";

export const createRole = async (role: NewRoleParams) => {
  const newRole = insertRoleSchema.parse(role);
  try {
    const [r] = await db.insert(roles).values(newRole).returning();
    return { role: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRole = async (id: RoleId, role: UpdateRoleParams) => {
  const { id: roleId } = roleIdSchema.parse({ id });
  const newRole = updateRoleSchema.parse(role);
  try {
    const [r] = await db
      .update(roles)
      .set(newRole)
      .where(eq(roles.id, roleId!))
      .returning();
    return { role: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRole = async (id: RoleId) => {
  const { id: roleId } = roleIdSchema.parse({ id });
  try {
    const [r] = await db.delete(roles).where(eq(roles.id, roleId!)).returning();
    return { role: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
