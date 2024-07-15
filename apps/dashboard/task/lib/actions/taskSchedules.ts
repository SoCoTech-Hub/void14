"use server";

import { revalidatePath } from "next/cache";
import {
  createTaskSchedule,
  deleteTaskSchedule,
  updateTaskSchedule,
} from "@/lib/api/taskSchedules/mutations";
import {
  TaskScheduleId,
  NewTaskScheduleParams,
  UpdateTaskScheduleParams,
  taskScheduleIdSchema,
  insertTaskScheduleParams,
  updateTaskScheduleParams,
} from "@/lib/db/schema/taskSchedules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTaskSchedules = () => revalidatePath("/task-schedules");

export const createTaskScheduleAction = async (input: NewTaskScheduleParams) => {
  try {
    const payload = insertTaskScheduleParams.parse(input);
    await createTaskSchedule(payload);
    revalidateTaskSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTaskScheduleAction = async (input: UpdateTaskScheduleParams) => {
  try {
    const payload = updateTaskScheduleParams.parse(input);
    await updateTaskSchedule(payload.id, payload);
    revalidateTaskSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTaskScheduleAction = async (input: TaskScheduleId) => {
  try {
    const payload = taskScheduleIdSchema.parse({ id: input });
    await deleteTaskSchedule(payload.id);
    revalidateTaskSchedules();
  } catch (e) {
    return handleErrors(e);
  }
};
