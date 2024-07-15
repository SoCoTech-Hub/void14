"use server";

import { revalidatePath } from "next/cache";
import {
  createConfig,
  deleteConfig,
  updateConfig,
} from "@/lib/api/configs/mutations";
import {
  ConfigId,
  NewConfigParams,
  UpdateConfigParams,
  configIdSchema,
  insertConfigParams,
  updateConfigParams,
} from "@/lib/db/schema/configs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateConfigs = () => revalidatePath("/configs");

export const createConfigAction = async (input: NewConfigParams) => {
  try {
    const payload = insertConfigParams.parse(input);
    await createConfig(payload);
    revalidateConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateConfigAction = async (input: UpdateConfigParams) => {
  try {
    const payload = updateConfigParams.parse(input);
    await updateConfig(payload.id, payload);
    revalidateConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteConfigAction = async (input: ConfigId) => {
  try {
    const payload = configIdSchema.parse({ id: input });
    await deleteConfig(payload.id);
    revalidateConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};
