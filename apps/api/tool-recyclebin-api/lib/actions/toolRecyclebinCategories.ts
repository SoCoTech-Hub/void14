"use server";

import { revalidatePath } from "next/cache";

import {
  createToolRecyclebinCategory,
  deleteToolRecyclebinCategory,
  updateToolRecyclebinCategory,
} from "../api/toolRecyclebinCategories/mutations";
import {
  insertToolRecyclebinCategoryParams,
  NewToolRecyclebinCategoryParams,
  ToolRecyclebinCategoryId,
  toolRecyclebinCategoryIdSchema,
  UpdateToolRecyclebinCategoryParams,
  updateToolRecyclebinCategoryParams,
} from "../db/schema/toolRecyclebinCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolRecyclebinCategories = () =>
  revalidatePath("/tool-recyclebin-categories");

export const createToolRecyclebinCategoryAction = async (
  input: NewToolRecyclebinCategoryParams,
) => {
  try {
    const payload = insertToolRecyclebinCategoryParams.parse(input);
    await createToolRecyclebinCategory(payload);
    revalidateToolRecyclebinCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolRecyclebinCategoryAction = async (
  input: UpdateToolRecyclebinCategoryParams,
) => {
  try {
    const payload = updateToolRecyclebinCategoryParams.parse(input);
    await updateToolRecyclebinCategory(payload.id, payload);
    revalidateToolRecyclebinCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolRecyclebinCategoryAction = async (
  input: ToolRecyclebinCategoryId,
) => {
  try {
    const payload = toolRecyclebinCategoryIdSchema.parse({ id: input });
    await deleteToolRecyclebinCategory(payload.id);
    revalidateToolRecyclebinCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
