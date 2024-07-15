"use server";

import { revalidatePath } from "next/cache";
import {
  createGlossaryEntriesCategory,
  deleteGlossaryEntriesCategory,
  updateGlossaryEntriesCategory,
} from "@/lib/api/glossaryEntriesCategories/mutations";
import {
  GlossaryEntriesCategoryId,
  NewGlossaryEntriesCategoryParams,
  UpdateGlossaryEntriesCategoryParams,
  glossaryEntriesCategoryIdSchema,
  insertGlossaryEntriesCategoryParams,
  updateGlossaryEntriesCategoryParams,
} from "@/lib/db/schema/glossaryEntriesCategories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateGlossaryEntriesCategories = () => revalidatePath("/glossary-entries-categories");

export const createGlossaryEntriesCategoryAction = async (input: NewGlossaryEntriesCategoryParams) => {
  try {
    const payload = insertGlossaryEntriesCategoryParams.parse(input);
    await createGlossaryEntriesCategory(payload);
    revalidateGlossaryEntriesCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateGlossaryEntriesCategoryAction = async (input: UpdateGlossaryEntriesCategoryParams) => {
  try {
    const payload = updateGlossaryEntriesCategoryParams.parse(input);
    await updateGlossaryEntriesCategory(payload.id, payload);
    revalidateGlossaryEntriesCategories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteGlossaryEntriesCategoryAction = async (input: GlossaryEntriesCategoryId) => {
  try {
    const payload = glossaryEntriesCategoryIdSchema.parse({ id: input });
    await deleteGlossaryEntriesCategory(payload.id);
    revalidateGlossaryEntriesCategories();
  } catch (e) {
    return handleErrors(e);
  }
};
