"use server";

import { revalidatePath } from "next/cache";
import {
  createLogDisplay,
  deleteLogDisplay,
  updateLogDisplay,
} from "@/lib/api/logDisplays/mutations";
import {
  LogDisplayId,
  NewLogDisplayParams,
  UpdateLogDisplayParams,
  logDisplayIdSchema,
  insertLogDisplayParams,
  updateLogDisplayParams,
} from "@/lib/db/schema/logDisplays";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLogDisplays = () => revalidatePath("/log-displays");

export const createLogDisplayAction = async (input: NewLogDisplayParams) => {
  try {
    const payload = insertLogDisplayParams.parse(input);
    await createLogDisplay(payload);
    revalidateLogDisplays();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLogDisplayAction = async (input: UpdateLogDisplayParams) => {
  try {
    const payload = updateLogDisplayParams.parse(input);
    await updateLogDisplay(payload.id, payload);
    revalidateLogDisplays();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLogDisplayAction = async (input: LogDisplayId) => {
  try {
    const payload = logDisplayIdSchema.parse({ id: input });
    await deleteLogDisplay(payload.id);
    revalidateLogDisplays();
  } catch (e) {
    return handleErrors(e);
  }
};