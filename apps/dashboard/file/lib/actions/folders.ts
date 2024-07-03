"use server";

import { revalidatePath } from "next/cache";
import {
  createFolder,
  deleteFolder,
  updateFolder,
} from "@/lib/api/folders/mutations";
import {
  FolderId,
  NewFolderParams,
  UpdateFolderParams,
  folderIdSchema,
  insertFolderParams,
  updateFolderParams,
} from "@/lib/db/schema/folders";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFolders = () => revalidatePath("/folders");

export const createFolderAction = async (input: NewFolderParams) => {
  try {
    const payload = insertFolderParams.parse(input);
    await createFolder(payload);
    revalidateFolders();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFolderAction = async (input: UpdateFolderParams) => {
  try {
    const payload = updateFolderParams.parse(input);
    await updateFolder(payload.id, payload);
    revalidateFolders();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFolderAction = async (input: FolderId) => {
  try {
    const payload = folderIdSchema.parse({ id: input });
    await deleteFolder(payload.id);
    revalidateFolders();
  } catch (e) {
    return handleErrors(e);
  }
};