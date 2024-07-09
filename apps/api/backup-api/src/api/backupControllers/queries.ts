import { and, eq } from "drizzle-orm";

import type { BackupControllerId } from "@soco/backup-db/schema/backupControllers";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/backup-db/index";
import {
  backupControllerIdSchema,
  backupControllers,
} from "@soco/backup-db/schema/backupControllers";

export const getBackupControllers = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(backupControllers)
    .where(eq(backupControllers.userId, session?.user.id!));
  const b = rows;
  return { backupControllers: b };
};

export const getBackupControllerById = async (id: BackupControllerId) => {
  const { session } = await getUserAuth();
  const { id: backupControllerId } = backupControllerIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(backupControllers)
    .where(
      and(
        eq(backupControllers.id, backupControllerId),
        eq(backupControllers.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const b = row;
  return { backupController: b };
};
