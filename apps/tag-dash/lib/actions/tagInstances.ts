"use server";

import { revalidatePath } from "next/cache";
import {
  createTagInstance,
  deleteTagInstance,
  updateTagInstance,
} from "@/lib/api/tagInstances/mutations";
import {
  TagInstanceId,
  NewTagInstanceParams,
  UpdateTagInstanceParams,
  tagInstanceIdSchema,
  insertTagInstanceParams,
  updateTagInstanceParams,
} from "@/lib/db/schema/tagInstances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateTagInstances = () => revalidatePath("/tag-instances");

export const createTagInstanceAction = async (input: NewTagInstanceParams) => {
  try {
    const payload = insertTagInstanceParams.parse(input);
    await createTagInstance(payload);
    revalidateTagInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateTagInstanceAction = async (input: UpdateTagInstanceParams) => {
  try {
    const payload = updateTagInstanceParams.parse(input);
    await updateTagInstance(payload.id, payload);
    revalidateTagInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteTagInstanceAction = async (input: TagInstanceId) => {
  try {
    const payload = tagInstanceIdSchema.parse({ id: input });
    await deleteTagInstance(payload.id);
    revalidateTagInstances();
  } catch (e) {
    return handleErrors(e);
  }
};