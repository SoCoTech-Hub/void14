import { db } from "@soco/task-db/client";
import { eq, and } from "@soco/task-db";
import { getUserAuth } from "@/lib/auth/utils";
import { type TaskAdhocId, taskAdhocIdSchema, taskAdhocs } from "@soco/task-db/schema/taskAdhocs";

export const getTaskAdhocs = async () => {
  const { session } = await getUserAuth();
  const rows = await db.select().from(taskAdhocs).where(eq(taskAdhocs.userId, session?.user.id!));
  const t = rows
  return { taskAdhocs: t };
};

export const getTaskAdhocById = async (id: TaskAdhocId) => {
  const { session } = await getUserAuth();
  const { id: taskAdhocId } = taskAdhocIdSchema.parse({ id });
  const [row] = await db.select().from(taskAdhocs).where(and(eq(taskAdhocs.id, taskAdhocId), eq(taskAdhocs.userId, session?.user.id!)));
  if (row === undefined) return {};
  const t = row;
  return { taskAdhoc: t };
};


