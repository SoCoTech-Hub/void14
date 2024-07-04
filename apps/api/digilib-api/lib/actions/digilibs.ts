"use server";

import { revalidatePath } from "next/cache";

import {
  createDigilib,
  deleteDigilib,
  updateDigilib,
} from "../api/digilibs/mutations";
import {
  DigilibId,
  digilibIdSchema,
  insertDigilibParams,
  NewDigilibParams,
  UpdateDigilibParams,
  updateDigilibParams,
} from "../db/schema/digilibs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateDigilibs = () => revalidatePath("/digilibs");

export const createDigilibAction = async (input: NewDigilibParams) => {
  try {
    const payload = insertDigilibParams.parse(input);
    await createDigilib(payload);
    revalidateDigilibs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateDigilibAction = async (input: UpdateDigilibParams) => {
  try {
    const payload = updateDigilibParams.parse(input);
    await updateDigilib(payload.id, payload);
    revalidateDigilibs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteDigilibAction = async (input: DigilibId) => {
  try {
    const payload = digilibIdSchema.parse({ id: input });
    await deleteDigilib(payload.id);
    revalidateDigilibs();
  } catch (e) {
    return handleErrors(e);
  }
};
