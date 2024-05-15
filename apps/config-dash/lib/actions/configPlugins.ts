"use server";

import { revalidatePath } from "next/cache";
import {
  createConfigPlugin,
  deleteConfigPlugin,
  updateConfigPlugin,
} from "@/lib/api/configPlugins/mutations";
import {
  ConfigPluginId,
  NewConfigPluginParams,
  UpdateConfigPluginParams,
  configPluginIdSchema,
  insertConfigPluginParams,
  updateConfigPluginParams,
} from "@/lib/db/schema/configPlugins";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateConfigPlugins = () => revalidatePath("/config-plugins");

export const createConfigPluginAction = async (input: NewConfigPluginParams) => {
  try {
    const payload = insertConfigPluginParams.parse(input);
    await createConfigPlugin(payload);
    revalidateConfigPlugins();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateConfigPluginAction = async (input: UpdateConfigPluginParams) => {
  try {
    const payload = updateConfigPluginParams.parse(input);
    await updateConfigPlugin(payload.id, payload);
    revalidateConfigPlugins();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteConfigPluginAction = async (input: ConfigPluginId) => {
  try {
    const payload = configPluginIdSchema.parse({ id: input });
    await deleteConfigPlugin(payload.id);
    revalidateConfigPlugins();
  } catch (e) {
    return handleErrors(e);
  }
};