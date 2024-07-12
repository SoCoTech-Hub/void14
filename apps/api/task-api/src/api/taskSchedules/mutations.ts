import type {
  NewTaskScheduleParams,
  TaskScheduleId,
  UpdateTaskScheduleParams,
} from "@soco/task-db/schema/taskSchedules";
import { eq } from "@soco/task-db";
import { db } from "@soco/task-db/client";
import {
  insertTaskScheduleSchema,
  taskScheduleIdSchema,
  taskSchedules,
  updateTaskScheduleSchema,
} from "@soco/task-db/schema/taskSchedules";

export const createTaskSchedule = async (
  taskSchedule: NewTaskScheduleParams,
) => {
  const newTaskSchedule = insertTaskScheduleSchema.parse(taskSchedule);
  try {
    const [t] = await db
      .insert(taskSchedules)
      .values(newTaskSchedule)
      .returning();
    return { taskSchedule: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateTaskSchedule = async (
  id: TaskScheduleId,
  taskSchedule: UpdateTaskScheduleParams,
) => {
  const { id: taskScheduleId } = taskScheduleIdSchema.parse({ id });
  const newTaskSchedule = updateTaskScheduleSchema.parse(taskSchedule);
  try {
    const [t] = await db
      .update(taskSchedules)
      .set(newTaskSchedule)
      .where(eq(taskSchedules.id, taskScheduleId!))
      .returning();
    return { taskSchedule: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteTaskSchedule = async (id: TaskScheduleId) => {
  const { id: taskScheduleId } = taskScheduleIdSchema.parse({ id });
  try {
    const [t] = await db
      .delete(taskSchedules)
      .where(eq(taskSchedules.id, taskScheduleId!))
      .returning();
    return { taskSchedule: t };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};
