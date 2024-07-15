"use server";

import { revalidatePath } from "next/cache";
import {
  createFilesReference,
  deleteFilesReference,
  updateFilesReference,
} from "@/lib/api/filesReferences/mutations";
import {
  FilesReferenceId,
  NewFilesReferenceParams,
  UpdateFilesReferenceParams,
  filesReferenceIdSchema,
  insertFilesReferenceParams,
  updateFilesReferenceParams,
} from "@/lib/db/schema/filesReferences";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateFilesReferences = () => revalidatePath("/files-references");

export const createFilesReferenceAction = async (input: NewFilesReferenceParams) => {
  try {
    const payload = insertFilesReferenceParams.parse(input);
    await createFilesReference(payload);
    revalidateFilesReferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateFilesReferenceAction = async (input: UpdateFilesReferenceParams) => {
  try {
    const payload = updateFilesReferenceParams.parse(input);
    await updateFilesReference(payload.id, payload);
    revalidateFilesReferences();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteFilesReferenceAction = async (input: FilesReferenceId) => {
  try {
    const payload = filesReferenceIdSchema.parse({ id: input });
    await deleteFilesReference(payload.id);
    revalidateFilesReferences();
  } catch (e) {
    return handleErrors(e);
  }
};
