"use server";

import { revalidatePath } from "next/cache";

import {
  createRepositoryInstance,
  deleteRepositoryInstance,
  updateRepositoryInstance,
} from "../api/repositoryInstances/mutations";
import {
  insertRepositoryInstanceParams,
  NewRepositoryInstanceParams,
  RepositoryInstanceId,
  repositoryInstanceIdSchema,
  UpdateRepositoryInstanceParams,
  updateRepositoryInstanceParams,
} from "../db/schema/repositoryInstances";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRepositoryInstances = () =>
  revalidatePath("/repository-instances");

export const createRepositoryInstanceAction = async (
  input: NewRepositoryInstanceParams,
) => {
  try {
    const payload = insertRepositoryInstanceParams.parse(input);
    await createRepositoryInstance(payload);
    revalidateRepositoryInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRepositoryInstanceAction = async (
  input: UpdateRepositoryInstanceParams,
) => {
  try {
    const payload = updateRepositoryInstanceParams.parse(input);
    await updateRepositoryInstance(payload.id, payload);
    revalidateRepositoryInstances();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRepositoryInstanceAction = async (
  input: RepositoryInstanceId,
) => {
  try {
    const payload = repositoryInstanceIdSchema.parse({ id: input });
    await deleteRepositoryInstance(payload.id);
    revalidateRepositoryInstances();
  } catch (e) {
    return handleErrors(e);
  }
};
