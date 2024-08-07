import type { ConfigLogId } from "@soco/config-db/schema/configLogs";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/config-db";
import { db } from "@soco/config-db/client";
import {
  configLogIdSchema,
  configLogs,
} from "@soco/config-db/schema/configLogs";

export const getConfigLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(configLogs)
    .where(eq(configLogs.userId, session?.user.id!));
  const c = rows;
  return { configLogs: c };
};

export const getConfigLogById = async (id: ConfigLogId) => {
  const { session } = await getUserAuth();
  const { id: configLogId } = configLogIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(configLogs)
    .where(
      and(
        eq(configLogs.id, configLogId),
        eq(configLogs.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const c = row;
  return { configLog: c };
};
