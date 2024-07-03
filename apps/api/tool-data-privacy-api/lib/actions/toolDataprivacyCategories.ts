"use server";

import { revalidatePath } from "next/cache";
import {
  createToolDataprivacyCategory,
  deleteToolDataprivacyCategory,
  updateToolDataprivacyCategory,
} from "@/lib/api/toolDataprivacyCategories/mutations";
import {
  ToolDataprivacyCategoryId,
  NewToolDataprivacyCategoryParams,
  UpdateToolDataprivacyCategoryParams,
  toolDataprivacyCategoryIdSchema,
  insertToolDataprivacyCategoryParams,
  updateToolDataprivacyCategoryParams,
} from "@/lib/db/schema/toolDataprivacyCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateToolDataprivacyCategories = () => revalidatePath("/tool-dataprivacy-categories");

export const createToolDataprivacyCategoryAction = async (input: NewToolDataprivacyCategoryParams) => {
  try {
    const payload = insertToolDataprivacyCategoryParams.parse(input);
    await createToolDataprivacyCategory(payload);
    revalidateToolDataprivacyCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateToolDataprivacyCategoryAction = async (input: UpdateToolDataprivacyCategoryParams) => {
  try {
    const payload = updateToolDataprivacyCategoryParams.parse(input);
    await updateToolDataprivacyCategory(payload.id, payload);
    revalidateToolDataprivacyCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteToolDataprivacyCategoryAction = async (input: ToolDataprivacyCategoryId) => {
  try {
    const payload = toolDataprivacyCategoryIdSchema.parse({ id: input });
    await deleteToolDataprivacyCategory(payload.id);
    revalidateToolDataprivacyCategories();
  } catch (e) {
    return handleErrors(e);
  }
};