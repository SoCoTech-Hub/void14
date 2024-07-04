import { db } from "@/lib/db/index";
import { eq, and } from "drizzle-orm";
import { getUserAuth } from "@soco/auth/utils";
import { type TaskAdhocId, taskAdhocIdSchema, taskAdhocs } from "@/lib/db/schema/taskAdhocs";

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


