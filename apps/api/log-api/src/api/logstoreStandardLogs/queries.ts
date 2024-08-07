import type { LogstoreStandardLogId } from "@soco/log-db/schema/logstoreStandardLogs";
import { getUserAuth } from "@soco/auth-service";
import { and, eq } from "@soco/log-db";
import { db } from "@soco/log-db/client";
import {
  logstoreStandardLogIdSchema,
  logstoreStandardLogs,
} from "@soco/log-db/schema/logstoreStandardLogs";

export const getLogstoreStandardLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(logstoreStandardLogs)
    .where(eq(logstoreStandardLogs.userId, session?.user.id!));
  const l = rows;
  return { logstoreStandardLogs: l };
};

export const getLogstoreStandardLogById = async (id: LogstoreStandardLogId) => {
  const { session } = await getUserAuth();
  const { id: logstoreStandardLogId } = logstoreStandardLogIdSchema.parse({
    id,
  });
  const [row] = await db
    .select()
    .from(logstoreStandardLogs)
    .where(
      and(
        eq(logstoreStandardLogs.id, logstoreStandardLogId),
        eq(logstoreStandardLogs.userId, session?.user.id!),
      ),
    );
  if (row === undefined) return {};
  const l = row;
  return { logstoreStandardLog: l };
};
