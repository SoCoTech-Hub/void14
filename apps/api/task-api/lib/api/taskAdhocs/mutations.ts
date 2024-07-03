import { db } from "@/lib/db/index";
import { and, eq } from "drizzle-orm";
import { 
  TaskAdhocId, 
  NewTaskAdhocParams,
  UpdateTaskAdhocParams, 
  updateTaskAdhocSchema,
  insertTaskAdhocSchema, 
  taskAdhocs,
  taskAdhocIdSchema 
} from "@/lib/db/schema/taskAdhocs";
import { getUserAuth } from "@/lib/auth/utils";

export const createTaskAdhoc = async (taskAdhoc: NewTaskAdhocParams) => {
  const { session } = await getUserAuth();
  const newTaskAdhoc = insertTaskAdhocSchema.parse({ ...taskAdhoc, userId: session?.user.id! });
  try {
    const [t] =  await db.insert(taskAdhocs).values(newTaskAdhoc).returning();
    return { taskAdhoc: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTaskAdhoc = async (id: TaskAdhocId, taskAdhoc: UpdateTaskAdhocParams) => {
  const { session } = await getUserAuth();
  const { id: taskAdhocId } = taskAdhocIdSchema.parse({ id });
  const newTaskAdhoc = updateTaskAdhocSchema.parse({ ...taskAdhoc, userId: session?.user.id! });
  try {
    const [t] =  await db
     .update(taskAdhocs)
     .set({...newTaskAdhoc, updatedAt: new Date() })
     .where(and(eq(taskAdhocs.id, taskAdhocId!), eq(taskAdhocs.userId, session?.user.id!)))
     .returning();
    return { taskAdhoc: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTaskAdhoc = async (id: TaskAdhocId) => {
  const { session } = await getUserAuth();
  const { id: taskAdhocId } = taskAdhocIdSchema.parse({ id });
  try {
    const [t] =  await db.delete(taskAdhocs).where(and(eq(taskAdhocs.id, taskAdhocId!), eq(taskAdhocs.userId, session?.user.id!)))
    .returning();
    return { taskAdhoc: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

