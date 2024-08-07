import type {
  AdminPresetAppPlugId,
  NewAdminPresetAppPlugParams,
  UpdateAdminPresetAppPlugParams,
} from "@soco/admin-preset-db/schema/adminPresetAppPlugs";
import { eq } from "@soco/admin-preset-db";
import { db } from "@soco/admin-preset-db/client";
import {
  adminPresetAppPlugIdSchema,
  adminPresetAppPlugs,
  insertAdminPresetAppPlugSchema,
  updateAdminPresetAppPlugSchema,
} from "@soco/admin-preset-db/schema/adminPresetAppPlugs";

export const createAdminPresetAppPlug = async (
  adminPresetAppPlug: NewAdminPresetAppPlugParams,
) => {
  const newAdminPresetAppPlug =
    insertAdminPresetAppPlugSchema.parse(adminPresetAppPlug);
  try {
    const [a] = await db
      .insert(adminPresetAppPlugs)
      .values(newAdminPresetAppPlug)
      .returning();
    return { adminPresetAppPlug: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminPresetAppPlug = async (
  id: AdminPresetAppPlugId,
  adminPresetAppPlug: UpdateAdminPresetAppPlugParams,
) => {
  const { id: adminPresetAppPlugId } = adminPresetAppPlugIdSchema.parse({ id });
  const newAdminPresetAppPlug =
    updateAdminPresetAppPlugSchema.parse(adminPresetAppPlug);
  try {
    const [a] = await db
      .update(adminPresetAppPlugs)
      .set(newAdminPresetAppPlug)
      .where(eq(adminPresetAppPlugs.id, adminPresetAppPlugId!))
      .returning();
    return { adminPresetAppPlug: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminPresetAppPlug = async (id: AdminPresetAppPlugId) => {
  const { id: adminPresetAppPlugId } = adminPresetAppPlugIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(adminPresetAppPlugs)
      .where(eq(adminPresetAppPlugs.id, adminPresetAppPlugId!))
      .returning();
    return { adminPresetAppPlug: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
