"use server";

import { revalidatePath } from "next/cache";

import {
  createRepositoryOnedriveAccess,
  deleteRepositoryOnedriveAccess,
  updateRepositoryOnedriveAccess,
} from "../api/repositoryOnedriveAccesses/mutations";
import {
  insertRepositoryOnedriveAccessParams,
  NewRepositoryOnedriveAccessParams,
  RepositoryOnedriveAccessId,
  repositoryOnedriveAccessIdSchema,
  UpdateRepositoryOnedriveAccessParams,
  updateRepositoryOnedriveAccessParams,
} from "../db/schema/repositoryOnedriveAccesses";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRepositoryOnedriveAccesses = () =>
  revalidatePath("/repository-onedrive-accesses");

export const createRepositoryOnedriveAccessAction = async (
  input: NewRepositoryOnedriveAccessParams,
) => {
  try {
    const payload = insertRepositoryOnedriveAccessParams.parse(input);
    await createRepositoryOnedriveAccess(payload);
    revalidateRepositoryOnedriveAccesses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRepositoryOnedriveAccessAction = async (
  input: UpdateRepositoryOnedriveAccessParams,
) => {
  try {
    const payload = updateRepositoryOnedriveAccessParams.parse(input);
    await updateRepositoryOnedriveAccess(payload.id, payload);
    revalidateRepositoryOnedriveAccesses();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRepositoryOnedriveAccessAction = async (
  input: RepositoryOnedriveAccessId,
) => {
  try {
    const payload = repositoryOnedriveAccessIdSchema.parse({ id: input });
    await deleteRepositoryOnedriveAccess(payload.id);
    revalidateRepositoryOnedriveAccesses();
  } catch (e) {
    return handleErrors(e);
  }
};
