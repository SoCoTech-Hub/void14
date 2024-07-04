"use server";

import { revalidatePath } from "next/cache";

import {
  createGlossaryCategory,
  deleteGlossaryCategory,
  updateGlossaryCategory,
} from "../api/glossaryCategories/mutations";
import {
  GlossaryCategoryId,
  glossaryCategoryIdSchema,
  insertGlossaryCategoryParams,
  NewGlossaryCategoryParams,
  UpdateGlossaryCategoryParams,
  updateGlossaryCategoryParams,
} from "../db/schema/glossaryCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGlossaryCategories = () =>
  revalidatePath("/glossary-categories");

export const createGlossaryCategoryAction = async (
  input: NewGlossaryCategoryParams,
) => {
  try {
    const payload = insertGlossaryCategoryParams.parse(input);
    await createGlossaryCategory(payload);
    revalidateGlossaryCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGlossaryCategoryAction = async (
  input: UpdateGlossaryCategoryParams,
) => {
  try {
    const payload = updateGlossaryCategoryParams.parse(input);
    await updateGlossaryCategory(payload.id, payload);
    revalidateGlossaryCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGlossaryCategoryAction = async (
  input: GlossaryCategoryId,
) => {
  try {
    const payload = glossaryCategoryIdSchema.parse({ id: input });
    await deleteGlossaryCategory(payload.id);
    revalidateGlossaryCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
