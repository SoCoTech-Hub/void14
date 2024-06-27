"use server";

import { revalidatePath } from "next/cache";
import {
  createH5p,
  deleteH5p,
  updateH5p,
} from "@/lib/api/h5ps/mutations";
import {
  H5pId,
  NewH5pParams,
  UpdateH5pParams,
  h5pIdSchema,
  insertH5pParams,
  updateH5pParams,
} from "@/lib/db/schema/h5ps";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5ps = () => revalidatePath("/h5ps");

export const createH5pAction = async (input: NewH5pParams) => {
  try {
    const payload = insertH5pParams.parse(input);
    await createH5p(payload);
    revalidateH5ps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pAction = async (input: UpdateH5pParams) => {
  try {
    const payload = updateH5pParams.parse(input);
    await updateH5p(payload.id, payload);
    revalidateH5ps();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pAction = async (input: H5pId) => {
  try {
    const payload = h5pIdSchema.parse({ id: input });
    await deleteH5p(payload.id);
    revalidateH5ps();
  } catch (e) {
    return handleErrors(e);
  }
};