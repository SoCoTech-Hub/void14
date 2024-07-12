import { db } from "@soco/backup-db/client";
import { eq, and } from "@soco/backup-db";
import { getUserAuth } from "@soco/auth-service";
import { type BackupControllerId, backupControllerIdSchema, backupControllers } from "@soco/backup-db/schema/backupControllers";

export const getBackupControllers = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(backupControllers).where(eq(backupControllers.userId, session?.user.id!));
  const b = rows
  return { backupControllers: b };
};

export const getBackupControllerById = async (id: BackupControllerId) => {
  const { session } = await getUserAuth();
  const { id: backupControllerId } = backupControllerIdSchema.parse({ id });
  const [row] = await db.select().from(backupControllers).where(and(eq(backupControllers.id, backupControllerId), eq(backupControllers.userId, session?.user.id!)));
  if (row === undefined) return {};
  const b = row;
  return { backupController: b };
};


