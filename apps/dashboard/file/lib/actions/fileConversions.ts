"use server";

import { revalidatePath } from "next/cache";
import {
  createFileConversion,
  deleteFileConversion,
  updateFileConversion,
} from "@/lib/api/fileConversions/mutations";
import {
  FileConversionId,
  NewFileConversionParams,
  UpdateFileConversionParams,
  fileConversionIdSchema,
  insertFileConversionParams,
  updateFileConversionParams,
} from "@/lib/db/schema/fileConversions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFileConversions = () => revalidatePath("/file-conversions");

export const createFileConversionAction = async (input: NewFileConversionParams) => {
  try {
    const payload = insertFileConversionParams.parse(input);
    await createFileConversion(payload);
    revalidateFileConversions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFileConversionAction = async (input: UpdateFileConversionParams) => {
  try {
    const payload = updateFileConversionParams.parse(input);
    await updateFileConversion(payload.id, payload);
    revalidateFileConversions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFileConversionAction = async (input: FileConversionId) => {
  try {
    const payload = fileConversionIdSchema.parse({ id: input });
    await deleteFileConversion(payload.id);
    revalidateFileConversions();
  } catch (e) {
    return handleErrors(e);
  }
};
