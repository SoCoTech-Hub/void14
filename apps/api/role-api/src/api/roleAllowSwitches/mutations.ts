import type {
  NewRoleAllowSwitchParams,
  RoleAllowSwitchId,
  UpdateRoleAllowSwitchParams,
} from "@soco/role-db/schema/roleAllowSwitches";
import { eq } from "@soco/role-db";
import { db } from "@soco/role-db/client";
import {
  insertRoleAllowSwitchSchema,
  roleAllowSwitches,
  roleAllowSwitchIdSchema,
  updateRoleAllowSwitchSchema,
} from "@soco/role-db/schema/roleAllowSwitches";

export const createRoleAllowSwitch = async (
  roleAllowSwitch: NewRoleAllowSwitchParams,
) => {
  const newRoleAllowSwitch = insertRoleAllowSwitchSchema.parse(roleAllowSwitch);
  try {
    const [r] = await db
      .insert(roleAllowSwitches)
      .values(newRoleAllowSwitch)
      .returning();
    return { roleAllowSwitch: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleAllowSwitch = async (
  id: RoleAllowSwitchId,
  roleAllowSwitch: UpdateRoleAllowSwitchParams,
) => {
  const { id: roleAllowSwitchId } = roleAllowSwitchIdSchema.parse({ id });
  const newRoleAllowSwitch = updateRoleAllowSwitchSchema.parse(roleAllowSwitch);
  try {
    const [r] = await db
      .update(roleAllowSwitches)
      .set(newRoleAllowSwitch)
      .where(eq(roleAllowSwitches.id, roleAllowSwitchId!))
      .returning();
    return { roleAllowSwitch: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleAllowSwitch = async (id: RoleAllowSwitchId) => {
  const { id: roleAllowSwitchId } = roleAllowSwitchIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(roleAllowSwitches)
      .where(eq(roleAllowSwitches.id, roleAllowSwitchId!))
      .returning();
    return { roleAllowSwitch: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
