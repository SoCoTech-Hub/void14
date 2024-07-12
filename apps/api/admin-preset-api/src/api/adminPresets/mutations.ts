import type {
  AdminPresetId,
  NewAdminPresetParams,
  UpdateAdminPresetParams,
} from "@soco/admin-preset-db/schema/adminPresets";
import { and, eq } from "@soco/admin-preset-db";
import { db } from "@soco/admin-preset-db/client";
import {
  adminPresetIdSchema,
  adminPresets,
  insertAdminPresetSchema,
  updateAdminPresetSchema,
} from "@soco/admin-preset-db/schema/adminPresets";
import { getUserAuth } from "@soco/auth-service";

export const createAdminPreset = async (adminPreset: NewAdminPresetParams) => {
  const { Session: session } = await getUserAuth();
  const newAdminPreset = insertAdminPresetSchema.parse({
    ...adminPreset,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .insert(adminPresets)
      .values(newAdminPreset)
      .returning();
    return { adminPreset: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateAdminPreset = async (
  id: AdminPresetId,
  adminPreset: UpdateAdminPresetParams,
) => {
  const { Session: session } = await getUserAuth();
  const { id: adminPresetId } = adminPresetIdSchema.parse({ id });
  const newAdminPreset = updateAdminPresetSchema.parse({
    ...adminPreset,
    userId: session?.user.id!,
  });
  try {
    const [a] = await db
      .update(adminPresets)
      .set({ ...newAdminPreset, updatedAt: new Date() })
      .where(
        and(
          eq(adminPresets.id, adminPresetId!),
          eq(adminPresets.userId, session?.user.id!),
        ),
      )
      .returning();
    return { adminPreset: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteAdminPreset = async (id: AdminPresetId) => {
  const { Session: session } = await getUserAuth();
  const { id: adminPresetId } = adminPresetIdSchema.parse({ id });
  try {
    const [a] = await db
      .delete(adminPresets)
      .where(
        and(
          eq(adminPresets.id, adminPresetId!),
          eq(adminPresets.userId, session?.user.id!),
        ),
      )
      .returning();
    return { adminPreset: a };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
