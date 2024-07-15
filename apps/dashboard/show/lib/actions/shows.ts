"use server";

import { revalidatePath } from "next/cache";
import {
  createShow,
  deleteShow,
  updateShow,
} from "@/lib/api/shows/mutations";
import {
  ShowId,
  NewShowParams,
  UpdateShowParams,
  showIdSchema,
  insertShowParams,
  updateShowParams,
} from "@/lib/db/schema/shows";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateShows = () => revalidatePath("/shows");

export const createShowAction = async (input: NewShowParams) => {
  try {
    const payload = insertShowParams.parse(input);
    await createShow(payload);
    revalidateShows();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateShowAction = async (input: UpdateShowParams) => {
  try {
    const payload = updateShowParams.parse(input);
    await updateShow(payload.id, payload);
    revalidateShows();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteShowAction = async (input: ShowId) => {
  try {
    const payload = showIdSchema.parse({ id: input });
    await deleteShow(payload.id);
    revalidateShows();
  } catch (e) {
    return handleErrors(e);
  }
};
