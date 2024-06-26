import { db } from "@/lib/db/index";
import { eq } from "drizzle-orm";
import { type TaskScheduleId, taskScheduleIdSchema, taskSchedules } from "@/lib/db/schema/taskSchedules";

export const getTaskSchedules = async () => {
  const rows = await db.select().from(taskSchedules);
  const t = rows
  return { taskSchedules: t };
};

export const getTaskScheduleById = async (id: TaskScheduleId) => {
  const { id: taskScheduleId } = taskScheduleIdSchema.parse({ id });
  const [row] = await db.select().from(taskSchedules).where(eq(taskSchedules.id, taskScheduleId));
  if (row === undefined) return {};
  const t = row;
  return { taskSchedule: t };
};


