import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type BackupLogId, backupLogIdSchema, backupLogs } from "@/lib/db/schema/backupLogs";

export const getBackupLogs = async () => {
  const rows = await db.select().from(backupLogs);
  const b = rows
  return { backupLogs: b };
};

export const getBackupLogById = async (id: BackupLogId) => {
  const { id: backupLogId } = backupLogIdSchema.parse({ id });
  const [row] = await db.select().from(backupLogs).where(eq(backupLogs.id, backupLogId));
  if (row === undefined) return {};
  const b = row;
  return { backupLog: b };
};


