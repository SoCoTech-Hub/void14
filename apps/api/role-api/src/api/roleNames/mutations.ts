import type {
  NewRoleNameParams,
  RoleNameId,
  UpdateRoleNameParams,
} from "@soco/role-db/schema/roleNames";
import { eq } from "@soco/role-db";
import { db } from "@soco/role-db/client";
import {
  insertRoleNameSchema,
  roleNameIdSchema,
  roleNames,
  updateRoleNameSchema,
} from "@soco/role-db/schema/roleNames";

export const createRoleName = async (roleName: NewRoleNameParams) => {
  const newRoleName = insertRoleNameSchema.parse(roleName);
  try {
    const [r] = await db.insert(roleNames).values(newRoleName).returning();
    return { roleName: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleName = async (
  id: RoleNameId,
  roleName: UpdateRoleNameParams,
) => {
  const { id: roleNameId } = roleNameIdSchema.parse({ id });
  const newRoleName = updateRoleNameSchema.parse(roleName);
  try {
    const [r] = await db
      .update(roleNames)
      .set(newRoleName)
      .where(eq(roleNames.id, roleNameId!))
      .returning();
    return { roleName: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleName = async (id: RoleNameId) => {
  const { id: roleNameId } = roleNameIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(roleNames)
      .where(eq(roleNames.id, roleNameId!))
      .returning();
    return { roleName: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
