"use server";

import { revalidatePath } from "next/cache";
import {
  createContent,
  deleteContent,
  updateContent,
} from "@/lib/api/contents/mutations";
import {
  ContentId,
  NewContentParams,
  UpdateContentParams,
  contentIdSchema,
  insertContentParams,
  updateContentParams,
} from "@/lib/db/schema/contents";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateContents = () => revalidatePath("/contents");

export const createContentAction = async (input: NewContentParams) => {
  try {
    const payload = insertContentParams.parse(input);
    await createContent(payload);
    revalidateContents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateContentAction = async (input: UpdateContentParams) => {
  try {
    const payload = updateContentParams.parse(input);
    await updateContent(payload.id, payload);
    revalidateContents();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteContentAction = async (input: ContentId) => {
  try {
    const payload = contentIdSchema.parse({ id: input });
    await deleteContent(payload.id);
    revalidateContents();
  } catch (e) {
    return handleErrors(e);
  }
};
