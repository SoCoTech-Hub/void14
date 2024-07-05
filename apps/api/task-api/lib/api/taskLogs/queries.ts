import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import type { TaskLogId } from "../../db/schema/taskLogs";
import { db } from "../../db/index";
import { taskLogIdSchema, taskLogs } from "../../db/schema/taskLogs";

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
