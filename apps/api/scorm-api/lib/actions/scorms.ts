"use server";

import { revalidatePath } from "next/cache";

import { createScorm, deleteScorm, updateScorm } from "../api/scorms/mutations";
import {
  insertScormParams,
  NewScormParams,
  ScormId,
  scormIdSchema,
  UpdateScormParams,
  updateScormParams,
} from "../db/schema/scorms";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScorms = () => revalidatePath("/scorms");

export const createScormAction = async (input: NewScormParams) => {
  try {
    const payload = insertScormParams.parse(input);
    await createScorm(payload);
    revalidateScorms();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScormAction = async (input: UpdateScormParams) => {
  try {
    const payload = updateScormParams.parse(input);
    await updateScorm(payload.id, payload);
    revalidateScorms();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScormAction = async (input: ScormId) => {
  try {
    const payload = scormIdSchema.parse({ id: input });
    await deleteScorm(payload.id);
    revalidateScorms();
  } catch (e) {
    return handleErrors(e);
  }
};
