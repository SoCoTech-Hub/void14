import type {
  NewRoleAllowViewParams,
  RoleAllowViewId,
  UpdateRoleAllowViewParams,
} from "@soco/role-db/schema/roleAllowViews";
import { eq } from "@soco/role-db";
import { db } from "@soco/role-db/client";
import {
  insertRoleAllowViewSchema,
  roleAllowViewIdSchema,
  roleAllowViews,
  updateRoleAllowViewSchema,
} from "@soco/role-db/schema/roleAllowViews";

export const createRoleAllowView = async (
  roleAllowView: NewRoleAllowViewParams,
) => {
  const newRoleAllowView = insertRoleAllowViewSchema.parse(roleAllowView);
  try {
    const [r] = await db
      .insert(roleAllowViews)
      .values(newRoleAllowView)
      .returning();
    return { roleAllowView: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateRoleAllowView = async (
  id: RoleAllowViewId,
  roleAllowView: UpdateRoleAllowViewParams,
) => {
  const { id: roleAllowViewId } = roleAllowViewIdSchema.parse({ id });
  const newRoleAllowView = updateRoleAllowViewSchema.parse(roleAllowView);
  try {
    const [r] = await db
      .update(roleAllowViews)
      .set(newRoleAllowView)
      .where(eq(roleAllowViews.id, roleAllowViewId!))
      .returning();
    return { roleAllowView: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteRoleAllowView = async (id: RoleAllowViewId) => {
  const { id: roleAllowViewId } = roleAllowViewIdSchema.parse({ id });
  try {
    const [r] = await db
      .delete(roleAllowViews)
      .where(eq(roleAllowViews.id, roleAllowViewId!))
      .returning();
    return { roleAllowView: r };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
