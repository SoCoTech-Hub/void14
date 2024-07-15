"use server";

import { revalidatePath } from "next/cache";
import {
  createLogQuery,
  deleteLogQuery,
  updateLogQuery,
} from "@/lib/api/logQueries/mutations";
import {
  LogQueryId,
  NewLogQueryParams,
  UpdateLogQueryParams,
  logQueryIdSchema,
  insertLogQueryParams,
  updateLogQueryParams,
} from "@/lib/db/schema/logQueries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateLogQueries = () => revalidatePath("/log-queries");

export const createLogQueryAction = async (input: NewLogQueryParams) => {
  try {
    const payload = insertLogQueryParams.parse(input);
    await createLogQuery(payload);
    revalidateLogQueries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateLogQueryAction = async (input: UpdateLogQueryParams) => {
  try {
    const payload = updateLogQueryParams.parse(input);
    await updateLogQuery(payload.id, payload);
    revalidateLogQueries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteLogQueryAction = async (input: LogQueryId) => {
  try {
    const payload = logQueryIdSchema.parse({ id: input });
    await deleteLogQuery(payload.id);
    revalidateLogQueries();
  } catch (e) {
    return handleErrors(e);
  }
};
