import type { TaskScheduleId } from "@soco/task-db/schema/taskSchedules";
import { eq } from "@soco/task-db";
import { db } from "@soco/task-db/client";
import {
  taskScheduleIdSchema,
  taskSchedules,
} from "@soco/task-db/schema/taskSchedules";

export const getTaskSchedules = async () => {
  const rows = await db.select().from(taskSchedules);
  const t = rows;
  return { taskSchedules: t };
};

export const getTaskScheduleById = async (id: TaskScheduleId) => {
  const { id: taskScheduleId } = taskScheduleIdSchema.parse({ id });
  const [row] = await db
    .select()
    .from(taskSchedules)
    .where(eq(taskSchedules.id, taskScheduleId));
  if (row === undefined) return {};
  const t = row;
  return { taskSchedule: t };
};
