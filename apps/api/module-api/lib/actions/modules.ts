"use server";

import { revalidatePath } from "next/cache";

import {
  createModule,
  deleteModule,
  updateModule,
} from "../api/modules/mutations";
import {
  insertModuleParams,
  ModuleId,
  moduleIdSchema,
  NewModuleParams,
  UpdateModuleParams,
  updateModuleParams,
} from "../db/schema/modules";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateModules = () => revalidatePath("/modules");

export const createModuleAction = async (input: NewModuleParams) => {
  try {
    const payload = insertModuleParams.parse(input);
    await createModule(payload);
    revalidateModules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateModuleAction = async (input: UpdateModuleParams) => {
  try {
    const payload = updateModuleParams.parse(input);
    await updateModule(payload.id, payload);
    revalidateModules();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteModuleAction = async (input: ModuleId) => {
  try {
    const payload = moduleIdSchema.parse({ id: input });
    await deleteModule(payload.id);
    revalidateModules();
  } catch (e) {
    return handleErrors(e);
  }
};
