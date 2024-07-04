"use server";

import { revalidatePath } from "next/cache";

import {
  createToolUserToursTour,
  deleteToolUserToursTour,
  updateToolUserToursTour,
} from "../api/toolUserToursTours/mutations";
import {
  insertToolUserToursTourParams,
  NewToolUserToursTourParams,
  ToolUserToursTourId,
  toolUserToursTourIdSchema,
  UpdateToolUserToursTourParams,
  updateToolUserToursTourParams,
} from "../db/schema/toolUserToursTours";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolUserToursTours = () =>
  revalidatePath("/tool-user-tours-tours");

export const createToolUserToursTourAction = async (
  input: NewToolUserToursTourParams,
) => {
  try {
    const payload = insertToolUserToursTourParams.parse(input);
    await createToolUserToursTour(payload);
    revalidateToolUserToursTours();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolUserToursTourAction = async (
  input: UpdateToolUserToursTourParams,
) => {
  try {
    const payload = updateToolUserToursTourParams.parse(input);
    await updateToolUserToursTour(payload.id, payload);
    revalidateToolUserToursTours();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolUserToursTourAction = async (
  input: ToolUserToursTourId,
) => {
  try {
    const payload = toolUserToursTourIdSchema.parse({ id: input });
    await deleteToolUserToursTour(payload.id);
    revalidateToolUserToursTours();
  } catch (e) {
    return handleErrors(e);
  }
};
