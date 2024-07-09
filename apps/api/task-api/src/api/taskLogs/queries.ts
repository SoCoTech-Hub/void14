import { and, eq } from "drizzle-orm";

import type { TaskLogId } from "@soco/task-db/schema/taskLogs";
import { getUserAuth } from "@soco/auth-services";
import { db } from "@soco/task-db/index";
import { taskLogIdSchema, taskLogs } from "@soco/task-db/schema/taskLogs";

export const getTaskLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db
    .select()
    .from(taskLogs)
    .where(eq(taskLogs.userId, session?.user.id!));
  const t = rows;
  return { taskLogs: t };
};

export const getTaskLogById = async (id: TaskLogId) => {
  const { session } = await getUserAuth();
  const { id: taskLogId } = taskLogIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(taskLogs)
    .where(
      and(eq(taskLogs.id, taskLogId), eq(taskLogs.userId, session?.user.id!)),
    );
  if (row === undefined) return {};
  const t = row;
  return { taskLog: t };
};
