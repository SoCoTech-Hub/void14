import type {
  AdminPresetItId,
  NewAdminPresetItParams,
  UpdateAdminPresetItParams,
} from "@soco/admin-preset-db/schema/adminPresetIts";
import { eq } from "@soco/admin-preset-db";
import { db } from "@soco/admin-preset-db/client";
import {
  adminPresetItIdSchema,
  adminPresetIts,
  insertAdminPresetItSchema,
  updateAdminPresetItSchema,
} from "@soco/admin-preset-db/schema/adminPresetIts";

export const createAdminPresetIt = async (
  adminPresetIt: NewAdminPresetItParams,
) => {
  const newAdminPresetIt = insertAdminPresetItSchema.parse(adminPresetIt);
  try {
    const [a] = await db
      .insert(adminPresetIts)
      .values(newAdminPresetIt)
      .returning();
    return { adminPresetIt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminPresetIt = async (
  id: AdminPresetItId,
  adminPresetIt: UpdateAdminPresetItParams,
) => {
  const { id: adminPresetItId } = adminPresetItIdSchema.parse({ id });
  const newAdminPresetIt = updateAdminPresetItSchema.parse(adminPresetIt);
  try {
    const [a] = await db
      .update(adminPresetIts)
      .set(newAdminPresetIt)
      .where(eq(adminPresetIts.id, adminPresetItId!))
      .returning();
    return { adminPresetIt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminPresetIt = async (id: AdminPresetItId) => {
  const { id: adminPresetItId } = adminPresetItIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(adminPresetIts)
      .where(eq(adminPresetIts.id, adminPresetItId!))
      .returning();
    return { adminPresetIt: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
