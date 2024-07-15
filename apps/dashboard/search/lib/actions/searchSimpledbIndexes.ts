"use server";

import { revalidatePath } from "next/cache";
import {
  createSearchSimpledbIndex,
  deleteSearchSimpledbIndex,
  updateSearchSimpledbIndex,
} from "@/lib/api/searchSimpledbIndexes/mutations";
import {
  SearchSimpledbIndexId,
  NewSearchSimpledbIndexParams,
  UpdateSearchSimpledbIndexParams,
  searchSimpledbIndexIdSchema,
  insertSearchSimpledbIndexParams,
  updateSearchSimpledbIndexParams,
} from "@/lib/db/schema/searchSimpledbIndexes";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateSearchSimpledbIndexes = () => revalidatePath("/search-simpledb-indexes");

export const createSearchSimpledbIndexAction = async (input: NewSearchSimpledbIndexParams) => {
  try {
    const payload = insertSearchSimpledbIndexParams.parse(input);
    await createSearchSimpledbIndex(payload);
    revalidateSearchSimpledbIndexes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateSearchSimpledbIndexAction = async (input: UpdateSearchSimpledbIndexParams) => {
  try {
    const payload = updateSearchSimpledbIndexParams.parse(input);
    await updateSearchSimpledbIndex(payload.id, payload);
    revalidateSearchSimpledbIndexes();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteSearchSimpledbIndexAction = async (input: SearchSimpledbIndexId) => {
  try {
    const payload = searchSimpledbIndexIdSchema.parse({ id: input });
    await deleteSearchSimpledbIndex(payload.id);
    revalidateSearchSimpledbIndexes();
  } catch (e) {
    return handleErrors(e);
  }
};
