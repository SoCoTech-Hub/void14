"use server";

import { revalidatePath } from "next/cache";

import {
  createRepository,
  deleteRepository,
  updateRepository,
} from "../api/repositories/mutations";
import {
  insertRepositoryParams,
  NewRepositoryParams,
  RepositoryId,
  repositoryIdSchema,
  UpdateRepositoryParams,
  updateRepositoryParams,
} from "../db/schema/repositories";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRepositories = () => revalidatePath("/repositories");

export const createRepositoryAction = async (input: NewRepositoryParams) => {
  try {
    const payload = insertRepositoryParams.parse(input);
    await createRepository(payload);
    revalidateRepositories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRepositoryAction = async (input: UpdateRepositoryParams) => {
  try {
    const payload = updateRepositoryParams.parse(input);
    await updateRepository(payload.id, payload);
    revalidateRepositories();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRepositoryAction = async (input: RepositoryId) => {
  try {
    const payload = repositoryIdSchema.parse({ id: input });
    await deleteRepository(payload.id);
    revalidateRepositories();
  } catch (e) {
    return handleErrors(e);
  }
};
