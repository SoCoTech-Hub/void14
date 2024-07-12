import type {
  BackupLogId,
  NewBackupLogParams,
  UpdateBackupLogParams,
} from "@soco/backup-db/schema/backupLogs";
import { eq } from "@soco/backup-db";
import { db } from "@soco/backup-db/client";
import {
  backupLogIdSchema,
  backupLogs,
  insertBackupLogSchema,
  updateBackupLogSchema,
} from "@soco/backup-db/schema/backupLogs";

export const createBackupLog = async (backupLog: NewBackupLogParams) => {
  const newBackupLog = insertBackupLogSchema.parse(backupLog);
  try {
    const [b] = await db.insert(backupLogs).values(newBackupLog).returning();
    return { backupLog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateBackupLog = async (
  id: BackupLogId,
  backupLog: UpdateBackupLogParams,
) => {
  const { id: backupLogId } = backupLogIdSchema.parse({ id });
  const newBackupLog = updateBackupLogSchema.parse(backupLog);
  try {
    const [b] = await db
      .update(backupLogs)
      .set({ ...newBackupLog, updatedAt: new Date() })
      .where(eq(backupLogs.id, backupLogId!))
      .returning();
    return { backupLog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteBackupLog = async (id: BackupLogId) => {
  const { id: backupLogId } = backupLogIdSchema.parse({ id });
  try {
    const [b] = await db
      .delete(backupLogs)
      .where(eq(backupLogs.id, backupLogId!))
      .returning();
    return { backupLog: b };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
