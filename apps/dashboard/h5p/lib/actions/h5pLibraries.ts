"use server";

import { revalidatePath } from "next/cache";
import {
  createH5pLibrary,
  deleteH5pLibrary,
  updateH5pLibrary,
} from "@/lib/api/h5pLibraries/mutations";
import {
  H5pLibraryId,
  NewH5pLibraryParams,
  UpdateH5pLibraryParams,
  h5pLibraryIdSchema,
  insertH5pLibraryParams,
  updateH5pLibraryParams,
} from "@/lib/db/schema/h5pLibraries";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pLibraries = () => revalidatePath("/h5p-libraries");

export const createH5pLibraryAction = async (input: NewH5pLibraryParams) => {
  try {
    const payload = insertH5pLibraryParams.parse(input);
    await createH5pLibrary(payload);
    revalidateH5pLibraries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pLibraryAction = async (input: UpdateH5pLibraryParams) => {
  try {
    const payload = updateH5pLibraryParams.parse(input);
    await updateH5pLibrary(payload.id, payload);
    revalidateH5pLibraries();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pLibraryAction = async (input: H5pLibraryId) => {
  try {
    const payload = h5pLibraryIdSchema.parse({ id: input });
    await deleteH5pLibrary(payload.id);
    revalidateH5pLibraries();
  } catch (e) {
    return handleErrors(e);
  }
};
