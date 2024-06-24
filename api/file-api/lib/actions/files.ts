"use server";

import { revalidatePath } from "next/cache";
import {
  createFile,
  deleteFile,
  updateFile,
} from "@/lib/api/files/mutations";
import {
  FileId,
  NewFileParams,
  UpdateFileParams,
  fileIdSchema,
  insertFileParams,
  updateFileParams,
} from "@/lib/db/schema/files";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFiles = () => revalidatePath("/files");

export const createFileAction = async (input: NewFileParams) => {
  try {
    const payload = insertFileParams.parse(input);
    await createFile(payload);
    revalidateFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFileAction = async (input: UpdateFileParams) => {
  try {
    const payload = updateFileParams.parse(input);
    await updateFile(payload.id, payload);
    revalidateFiles();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFileAction = async (input: FileId) => {
  try {
    const payload = fileIdSchema.parse({ id: input });
    await deleteFile(payload.id);
    revalidateFiles();
  } catch (e) {
    return handleErrors(e);
  }
};