"use server";

import { revalidatePath } from "next/cache";
import {
  createH5pLibrariesCachedasset,
  deleteH5pLibrariesCachedasset,
  updateH5pLibrariesCachedasset,
} from "@/lib/api/h5pLibrariesCachedassets/mutations";
import {
  H5pLibrariesCachedassetId,
  NewH5pLibrariesCachedassetParams,
  UpdateH5pLibrariesCachedassetParams,
  h5pLibrariesCachedassetIdSchema,
  insertH5pLibrariesCachedassetParams,
  updateH5pLibrariesCachedassetParams,
} from "@/lib/db/schema/h5pLibrariesCachedassets";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateH5pLibrariesCachedassets = () => revalidatePath("/h5p-libraries-cachedassets");

export const createH5pLibrariesCachedassetAction = async (input: NewH5pLibrariesCachedassetParams) => {
  try {
    const payload = insertH5pLibrariesCachedassetParams.parse(input);
    await createH5pLibrariesCachedasset(payload);
    revalidateH5pLibrariesCachedassets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateH5pLibrariesCachedassetAction = async (input: UpdateH5pLibrariesCachedassetParams) => {
  try {
    const payload = updateH5pLibrariesCachedassetParams.parse(input);
    await updateH5pLibrariesCachedasset(payload.id, payload);
    revalidateH5pLibrariesCachedassets();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteH5pLibrariesCachedassetAction = async (input: H5pLibrariesCachedassetId) => {
  try {
    const payload = h5pLibrariesCachedassetIdSchema.parse({ id: input });
    await deleteH5pLibrariesCachedasset(payload.id);
    revalidateH5pLibrariesCachedassets();
  } catch (e) {
    return handleErrors(e);
  }
};
