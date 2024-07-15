"use server";

import { revalidatePath } from "next/cache";
import {
  createTaskAdhoc,
  deleteTaskAdhoc,
  updateTaskAdhoc,
} from "@/lib/api/taskAdhocs/mutations";
import {
  TaskAdhocId,
  NewTaskAdhocParams,
  UpdateTaskAdhocParams,
  taskAdhocIdSchema,
  insertTaskAdhocParams,
  updateTaskAdhocParams,
} from "@/lib/db/schema/taskAdhocs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTaskAdhocs = () => revalidatePath("/task-adhocs");

export const createTaskAdhocAction = async (input: NewTaskAdhocParams) => {
  try {
    const payload = insertTaskAdhocParams.parse(input);
    await createTaskAdhoc(payload);
    revalidateTaskAdhocs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTaskAdhocAction = async (input: UpdateTaskAdhocParams) => {
  try {
    const payload = updateTaskAdhocParams.parse(input);
    await updateTaskAdhoc(payload.id, payload);
    revalidateTaskAdhocs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTaskAdhocAction = async (input: TaskAdhocId) => {
  try {
    const payload = taskAdhocIdSchema.parse({ id: input });
    await deleteTaskAdhoc(payload.id);
    revalidateTaskAdhocs();
  } catch (e) {
    return handleErrors(e);
  }
};
