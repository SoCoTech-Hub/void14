"use server";

import { revalidatePath } from "next/cache";

import {
  createContext,
  deleteContext,
  updateContext,
} from "../api/contexts/mutations";
import {
  ContextId,
  contextIdSchema,
  insertContextParams,
  NewContextParams,
  UpdateContextParams,
  updateContextParams,
} from "../db/schema/contexts";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateContexts = () => revalidatePath("/contexts");

export const createContextAction = async (input: NewContextParams) => {
  try {
    const payload = insertContextParams.parse(input);
    await createContext(payload);
    revalidateContexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateContextAction = async (input: UpdateContextParams) => {
  try {
    const payload = updateContextParams.parse(input);
    await updateContext(payload.id, payload);
    revalidateContexts();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteContextAction = async (input: ContextId) => {
  try {
    const payload = contextIdSchema.parse({ id: input });
    await deleteContext(payload.id);
    revalidateContexts();
  } catch (e) {
    return handleErrors(e);
  }
};
