import { and, eq } from "drizzle-orm";

import { getUserAuth } from "@soco/auth/utils";

import { db } from "../db/index";
import {
  insertTaskAdhocSchema,
  NewTaskAdhocParams,
  TaskAdhocId,
  taskAdhocIdSchema,
  taskAdhocs,
  UpdateTaskAdhocParams,
  updateTaskAdhocSchema,
} from "../db/schema/taskAdhocs";

export const createTaskAdhoc = async (taskAdhoc: NewTaskAdhocParams) => {
  const { session } = await getUserAuth();
  const newTaskAdhoc = insertTaskAdhocSchema.parse({
    ...taskAdhoc,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db.insert(taskAdhocs).values(newTaskAdhoc).returning();
    return { taskAdhoc: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTaskAdhoc = async (
  id: TaskAdhocId,
  taskAdhoc: UpdateTaskAdhocParams,
) => {
  const { session } = await getUserAuth();
  const { id: taskAdhocId } = taskAdhocIdSchema.parse({ id });
  const newTaskAdhoc = updateTaskAdhocSchema.parse({
    ...taskAdhoc,
    userId: session?.user.id!,
  });
  try {
    const [t] = await db
      .update(taskAdhocs)
      .set({ ...newTaskAdhoc, updatedAt: new Date() })
      .where(
        and(
          eq(taskAdhocs.id, taskAdhocId!),
          eq(taskAdhocs.userId, session?.user.id!),
        ),
      )
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
    const [t] = await db
      .delete(taskAdhocs)
      .where(
        and(
          eq(taskAdhocs.id, taskAdhocId!),
          eq(taskAdhocs.userId, session?.user.id!),
        ),
      )
      .returning();
    return { taskAdhoc: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
