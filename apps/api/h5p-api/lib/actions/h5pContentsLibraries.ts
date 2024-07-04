"use server";

import { revalidatePath } from "next/cache";

import {
  createH5pContentsLibrary,
  deleteH5pContentsLibrary,
  updateH5pContentsLibrary,
} from "../api/h5pContentsLibraries/mutations";
import {
  H5pContentsLibraryId,
  h5pContentsLibraryIdSchema,
  insertH5pContentsLibraryParams,
  NewH5pContentsLibraryParams,
  UpdateH5pContentsLibraryParams,
  updateH5pContentsLibraryParams,
} from "../db/schema/h5pContentsLibraries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pContentsLibraries = () =>
  revalidatePath("/h5p-contents-libraries");

export const createH5pContentsLibraryAction = async (
  input: NewH5pContentsLibraryParams,
) => {
  try {
    const payload = insertH5pContentsLibraryParams.parse(input);
    await createH5pContentsLibrary(payload);
    revalidateH5pContentsLibraries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pContentsLibraryAction = async (
  input: UpdateH5pContentsLibraryParams,
) => {
  try {
    const payload = updateH5pContentsLibraryParams.parse(input);
    await updateH5pContentsLibrary(payload.id, payload);
    revalidateH5pContentsLibraries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pContentsLibraryAction = async (
  input: H5pContentsLibraryId,
) => {
  try {
    const payload = h5pContentsLibraryIdSchema.parse({ id: input });
    await deleteH5pContentsLibrary(payload.id);
    revalidateH5pContentsLibraries();
  } catch (e) {
    return handleErrors(e);
  }
};
