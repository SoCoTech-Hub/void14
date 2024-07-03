"use server";

import { revalidatePath } from "next/cache";
import {
  createTaskLog,
  deleteTaskLog,
  updateTaskLog,
} from "@/lib/api/taskLogs/mutations";
import {
  TaskLogId,
  NewTaskLogParams,
  UpdateTaskLogParams,
  taskLogIdSchema,
  insertTaskLogParams,
  updateTaskLogParams,
} from "@/lib/db/schema/taskLogs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTaskLogs = () => revalidatePath("/task-logs");

export const createTaskLogAction = async (input: NewTaskLogParams) => {
  try {
    const payload = insertTaskLogParams.parse(input);
    await createTaskLog(payload);
    revalidateTaskLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTaskLogAction = async (input: UpdateTaskLogParams) => {
  try {
    const payload = updateTaskLogParams.parse(input);
    await updateTaskLog(payload.id, payload);
    revalidateTaskLogs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTaskLogAction = async (input: TaskLogId) => {
  try {
    const payload = taskLogIdSchema.parse({ id: input });
    await deleteTaskLog(payload.id);
    revalidateTaskLogs();
  } catch (e) {
    return handleErrors(e);
  }
};