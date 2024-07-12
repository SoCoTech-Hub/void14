import { db } from "@soco/task-db/client";
import { eq, and } from "@soco/task-db";
import { getUserAuth } from "@soco/auth-service";
import { type TaskLogId, taskLogIdSchema, taskLogs } from "@soco/task-db/schema/taskLogs";

export const getTaskLogs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(taskLogs).where(eq(taskLogs.userId, session?.user.id!));
  const t = rows
  return { taskLogs: t };
};

export const getTaskLogById = async (id: TaskLogId) => {
  const { session } = await getUserAuth();
  const { id: taskLogId } = taskLogIdSchema.parse({ id });
  const [row] = await db.select().from(taskLogs).where(and(eq(taskLogs.id, taskLogId), eq(taskLogs.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { taskLog: t };
};


