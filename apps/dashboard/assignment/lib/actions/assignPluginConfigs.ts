"use server";

import { revalidatePath } from "next/cache";
import {
  createAssignPluginConfig,
  deleteAssignPluginConfig,
  updateAssignPluginConfig,
} from "@/lib/api/assignPluginConfigs/mutations";
import {
  AssignPluginConfigId,
  NewAssignPluginConfigParams,
  UpdateAssignPluginConfigParams,
  assignPluginConfigIdSchema,
  insertAssignPluginConfigParams,
  updateAssignPluginConfigParams,
} from "@/lib/db/schema/assignPluginConfigs";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateAssignPluginConfigs = () => revalidatePath("/assign-plugin-configs");

export const createAssignPluginConfigAction = async (input: NewAssignPluginConfigParams) => {
  try {
    const payload = insertAssignPluginConfigParams.parse(input);
    await createAssignPluginConfig(payload);
    revalidateAssignPluginConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateAssignPluginConfigAction = async (input: UpdateAssignPluginConfigParams) => {
  try {
    const payload = updateAssignPluginConfigParams.parse(input);
    await updateAssignPluginConfig(payload.id, payload);
    revalidateAssignPluginConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteAssignPluginConfigAction = async (input: AssignPluginConfigId) => {
  try {
    const payload = assignPluginConfigIdSchema.parse({ id: input });
    await deleteAssignPluginConfig(payload.id);
    revalidateAssignPluginConfigs();
  } catch (e) {
    return handleErrors(e);
  }
};
