"use server";

import { revalidatePath } from "next/cache";
import {
  createH5pactivity,
  deleteH5pactivity,
  updateH5pactivity,
} from "@/lib/api/h5pactivities/mutations";
import {
  H5pactivityId,
  NewH5pactivityParams,
  UpdateH5pactivityParams,
  h5pactivityIdSchema,
  insertH5pactivityParams,
  updateH5pactivityParams,
} from "@/lib/db/schema/h5pactivities";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pactivities = () => revalidatePath("/h5pactivities");

export const createH5pactivityAction = async (input: NewH5pactivityParams) => {
  try {
    const payload = insertH5pactivityParams.parse(input);
    await createH5pactivity(payload);
    revalidateH5pactivities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pactivityAction = async (input: UpdateH5pactivityParams) => {
  try {
    const payload = updateH5pactivityParams.parse(input);
    await updateH5pactivity(payload.id, payload);
    revalidateH5pactivities();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pactivityAction = async (input: H5pactivityId) => {
  try {
    const payload = h5pactivityIdSchema.parse({ id: input });
    await deleteH5pactivity(payload.id);
    revalidateH5pactivities();
  } catch (e) {
    return handleErrors(e);
  }
};
