import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { BackupControllerId } from "../db/schema/backupControllers";
import { db } from "../db/index";
import {
  backupControllerIdSchema,
  backupControllers,
} from "../db/schema/backupControllers";

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
