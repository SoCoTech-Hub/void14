"use server";

import { revalidatePath } from "next/cache";

import {
  createShowsCategory,
  deleteShowsCategory,
  updateShowsCategory,
} from "../api/showsCategories/mutations";
import {
  insertShowsCategoryParams,
  NewShowsCategoryParams,
  ShowsCategoryId,
  showsCategoryIdSchema,
  UpdateShowsCategoryParams,
  updateShowsCategoryParams,
} from "../db/schema/showsCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateShowsCategories = () => revalidatePath("/shows-categories");

export const createShowsCategoryAction = async (
  input: NewShowsCategoryParams,
) => {
  try {
    const payload = insertShowsCategoryParams.parse(input);
    await createShowsCategory(payload);
    revalidateShowsCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateShowsCategoryAction = async (
  input: UpdateShowsCategoryParams,
) => {
  try {
    const payload = updateShowsCategoryParams.parse(input);
    await updateShowsCategory(payload.id, payload);
    revalidateShowsCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteShowsCategoryAction = async (input: ShowsCategoryId) => {
  try {
    const payload = showsCategoryIdSchema.parse({ id: input });
    await deleteShowsCategory(payload.id);
    revalidateShowsCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
