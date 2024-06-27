"use server";

import { revalidatePath } from "next/cache";
import {
  createH5pLibraryDependency,
  deleteH5pLibraryDependency,
  updateH5pLibraryDependency,
} from "@/lib/api/h5pLibraryDependencies/mutations";
import {
  H5pLibraryDependencyId,
  NewH5pLibraryDependencyParams,
  UpdateH5pLibraryDependencyParams,
  h5pLibraryDependencyIdSchema,
  insertH5pLibraryDependencyParams,
  updateH5pLibraryDependencyParams,
} from "@/lib/db/schema/h5pLibraryDependencies";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pLibraryDependencies = () => revalidatePath("/h5p-library-dependencies");

export const createH5pLibraryDependencyAction = async (input: NewH5pLibraryDependencyParams) => {
  try {
    const payload = insertH5pLibraryDependencyParams.parse(input);
    await createH5pLibraryDependency(payload);
    revalidateH5pLibraryDependencies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pLibraryDependencyAction = async (input: UpdateH5pLibraryDependencyParams) => {
  try {
    const payload = updateH5pLibraryDependencyParams.parse(input);
    await updateH5pLibraryDependency(payload.id, payload);
    revalidateH5pLibraryDependencies();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pLibraryDependencyAction = async (input: H5pLibraryDependencyId) => {
  try {
    const payload = h5pLibraryDependencyIdSchema.parse({ id: input });
    await deleteH5pLibraryDependency(payload.id);
    revalidateH5pLibraryDependencies();
  } catch (e) {
    return handleErrors(e);
  }
};