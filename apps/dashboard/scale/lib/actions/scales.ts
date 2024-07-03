"use server";

import { revalidatePath } from "next/cache";
import {
  createScale,
  deleteScale,
  updateScale,
} from "@/lib/api/scales/mutations";
import {
  ScaleId,
  NewScaleParams,
  UpdateScaleParams,
  scaleIdSchema,
  insertScaleParams,
  updateScaleParams,
} from "@/lib/db/schema/scales";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateScales = () => revalidatePath("/scales");

export const createScaleAction = async (input: NewScaleParams) => {
  try {
    const payload = insertScaleParams.parse(input);
    await createScale(payload);
    revalidateScales();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateScaleAction = async (input: UpdateScaleParams) => {
  try {
    const payload = updateScaleParams.parse(input);
    await updateScale(payload.id, payload);
    revalidateScales();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteScaleAction = async (input: ScaleId) => {
  try {
    const payload = scaleIdSchema.parse({ id: input });
    await deleteScale(payload.id);
    revalidateScales();
  } catch (e) {
    return handleErrors(e);
  }
};