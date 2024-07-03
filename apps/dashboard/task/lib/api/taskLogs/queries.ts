import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@/lib/auth/utils";
import { type TaskLogId, taskLogIdSchema, taskLogs } from "@/lib/db/schema/taskLogs";

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


