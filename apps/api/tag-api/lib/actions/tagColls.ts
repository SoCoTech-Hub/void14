"use server";

import { revalidatePath } from "next/cache";

import {
  createTagColl,
  deleteTagColl,
  updateTagColl,
} from "../api/tagColls/mutations";
import {
  insertTagCollParams,
  NewTagCollParams,
  TagCollId,
  tagCollIdSchema,
  UpdateTagCollParams,
  updateTagCollParams,
} from "../db/schema/tagColls";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTagColls = () => revalidatePath("/tag-colls");

export const createTagCollAction = async (input: NewTagCollParams) => {
  try {
    const payload = insertTagCollParams.parse(input);
    await createTagColl(payload);
    revalidateTagColls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTagCollAction = async (input: UpdateTagCollParams) => {
  try {
    const payload = updateTagCollParams.parse(input);
    await updateTagColl(payload.id, payload);
    revalidateTagColls();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTagCollAction = async (input: TagCollId) => {
  try {
    const payload = tagCollIdSchema.parse({ id: input });
    await deleteTagColl(payload.id);
    revalidateTagColls();
  } catch (e) {
    return handleErrors(e);
  }
};
