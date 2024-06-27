"use server";

import { revalidatePath } from "next/cache";
import {
  createRepositoryInstanceConfig,
  deleteRepositoryInstanceConfig,
  updateRepositoryInstanceConfig,
} from "@/lib/api/repositoryInstanceConfigs/mutations";
import {
  RepositoryInstanceConfigId,
  NewRepositoryInstanceConfigParams,
  UpdateRepositoryInstanceConfigParams,
  repositoryInstanceConfigIdSchema,
  insertRepositoryInstanceConfigParams,
  updateRepositoryInstanceConfigParams,
} from "@/lib/db/schema/repositoryInstanceConfigs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateRepositoryInstanceConfigs = () => revalidatePath("/repository-instance-configs");

export const createRepositoryInstanceConfigAction = async (input: NewRepositoryInstanceConfigParams) => {
  try {
    const payload = insertRepositoryInstanceConfigParams.parse(input);
    await createRepositoryInstanceConfig(payload);
    revalidateRepositoryInstanceConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateRepositoryInstanceConfigAction = async (input: UpdateRepositoryInstanceConfigParams) => {
  try {
    const payload = updateRepositoryInstanceConfigParams.parse(input);
    await updateRepositoryInstanceConfig(payload.id, payload);
    revalidateRepositoryInstanceConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteRepositoryInstanceConfigAction = async (input: RepositoryInstanceConfigId) => {
  try {
    const payload = repositoryInstanceConfigIdSchema.parse({ id: input });
    await deleteRepositoryInstanceConfig(payload.id);
    revalidateRepositoryInstanceConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};