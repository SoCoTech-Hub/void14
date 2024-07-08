import { db } from "@soco/task-db/index";
import { and, eq } from "drizzle-orm";
import { 
  TaskLogId, 
  NewTaskLogParams,
  UpdateTaskLogParams, 
  updateTaskLogSchema,
  insertTaskLogSchema, 
  taskLogs,
  taskLogIdSchema 
} from "@soco/task-db/schema/taskLogs";
import { getUserAuth } from "@/lib/auth/utils";

export const createTaskLog = async (taskLog: NewTaskLogParams) => {
  const { session } = await getUserAuth();
  const newTaskLog = insertTaskLogSchema.parse({ ...taskLog, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(taskLogs).values(newTaskLog).returning();
    return { taskLog: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTaskLog = async (id: TaskLogId, taskLog: UpdateTaskLogParams) => {
  const { session } = await getUserAuth();
  const { id: taskLogId } = taskLogIdSchema.parse({ id });
  const newTaskLog = updateTaskLogSchema.parse({ ...taskLog, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(taskLogs)
     .set({...newTaskLog, updatedAt: new Date() })
     .where(and(eq(taskLogs.id, taskLogId!), eq(taskLogs.userId, session?.user.id!)))
     .returning();
    return { taskLog: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTaskLog = async (id: TaskLogId) => {
  const { session } = await getUserAuth();
  const { id: taskLogId } = taskLogIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(taskLogs).where(and(eq(taskLogs.id, taskLogId!), eq(taskLogs.userId, session?.user.id!)))
    .returning();
    return { taskLog: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

