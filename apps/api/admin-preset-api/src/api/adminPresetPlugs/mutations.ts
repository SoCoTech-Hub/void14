import type {
  AdminPresetPlugId,
  NewAdminPresetPlugParams,
  UpdateAdminPresetPlugParams,
} from "@soco/admin-preset-db/schema/adminPresetPlugs";
import { db, eq } from "@soco/admin-preset-db";
import {
  adminPresetPlugIdSchema,
  adminPresetPlugs,
  insertAdminPresetPlugSchema,
  updateAdminPresetPlugSchema,
} from "@soco/admin-preset-db/schema/adminPresetPlugs";

export const createAdminPresetPlug = async (
  adminPresetPlug: NewAdminPresetPlugParams,
) => {
  const newAdminPresetPlug = insertAdminPresetPlugSchema.parse(adminPresetPlug);
  try {
    const [a] = await db
      .insert(adminPresetPlugs)
      .values(newAdminPresetPlug)
      .returning();
    return { adminPresetPlug: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminPresetPlug = async (
  id: AdminPresetPlugId,
  adminPresetPlug: UpdateAdminPresetPlugParams,
) => {
  const { id: adminPresetPlugId } = adminPresetPlugIdSchema.parse({ id });
  const newAdminPresetPlug = updateAdminPresetPlugSchema.parse(adminPresetPlug);
  try {
    const [a] = await db
      .update(adminPresetPlugs)
      .set(newAdminPresetPlug)
      .where(eq(adminPresetPlugs.id, adminPresetPlugId!))
      .returning();
    return { adminPresetPlug: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminPresetPlug = async (id: AdminPresetPlugId) => {
  const { id: adminPresetPlugId } = adminPresetPlugIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(adminPresetPlugs)
      .where(eq(adminPresetPlugs.id, adminPresetPlugId!))
      .returning();
    return { adminPresetPlug: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
