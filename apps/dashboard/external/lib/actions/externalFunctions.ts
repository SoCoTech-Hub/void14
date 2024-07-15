"use server";

import { revalidatePath } from "next/cache";
import {
  createExternalFunction,
  deleteExternalFunction,
  updateExternalFunction,
} from "@/lib/api/externalFunctions/mutations";
import {
  ExternalFunctionId,
  NewExternalFunctionParams,
  UpdateExternalFunctionParams,
  externalFunctionIdSchema,
  insertExternalFunctionParams,
  updateExternalFunctionParams,
} from "@/lib/db/schema/externalFunctions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateExternalFunctions = () => revalidatePath("/external-functions");

export const createExternalFunctionAction = async (input: NewExternalFunctionParams) => {
  try {
    const payload = insertExternalFunctionParams.parse(input);
    await createExternalFunction(payload);
    revalidateExternalFunctions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateExternalFunctionAction = async (input: UpdateExternalFunctionParams) => {
  try {
    const payload = updateExternalFunctionParams.parse(input);
    await updateExternalFunction(payload.id, payload);
    revalidateExternalFunctions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteExternalFunctionAction = async (input: ExternalFunctionId) => {
  try {
    const payload = externalFunctionIdSchema.parse({ id: input });
    await deleteExternalFunction(payload.id);
    revalidateExternalFunctions();
  } catch (e) {
    return handleErrors(e);
  }
};
