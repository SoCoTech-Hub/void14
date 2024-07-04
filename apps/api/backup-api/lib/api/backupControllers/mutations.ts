import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  BackupControllerId,
  backupControllerIdSchema,
  backupControllers,
  insertBackupControllerSchema,
  NewBackupControllerParams,
  UpdateBackupControllerParams,
  updateBackupControllerSchema,
} from "../db/schema/backupControllers";

export const createBackupController = async (
  backupController: NewBackupControllerParams,
) => {
  const { session } = await getUserAuth();
  const newBackupController = insertBackupControllerSchema.parse({
    ...backupController,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .insert(backupControllers)
      .values(newBackupController)
      .returning();
    return { backupController: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBackupController = async (
  id: BackupControllerId,
  backupController: UpdateBackupControllerParams,
) => {
  const { session } = await getUserAuth();
  const { id: backupControllerId } = backupControllerIdSchema.parse({ id });
  const newBackupController = updateBackupControllerSchema.parse({
    ...backupController,
    userId: session?.user.id!,
  });
  try {
    const [b] = await db
      .update(backupControllers)
      .set({ ...newBackupController, updatedAt: new Date() })
      .where(
        and(
          eq(backupControllers.id, backupControllerId!),
          eq(backupControllers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { backupController: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBackupController = async (id: BackupControllerId) => {
  const { session } = await getUserAuth();
  const { id: backupControllerId } = backupControllerIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(backupControllers)
      .where(
        and(
          eq(backupControllers.id, backupControllerId!),
          eq(backupControllers.userId, session?.user.id!),
        ),
      )
      .returning();
    return { backupController: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
