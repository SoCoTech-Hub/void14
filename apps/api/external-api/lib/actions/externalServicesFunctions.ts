"use server";

import { revalidatePath } from "next/cache";

import {
  createExternalServicesFunction,
  deleteExternalServicesFunction,
  updateExternalServicesFunction,
} from "../api/externalServicesFunctions/mutations";
import {
  ExternalServicesFunctionId,
  externalServicesFunctionIdSchema,
  insertExternalServicesFunctionParams,
  NewExternalServicesFunctionParams,
  UpdateExternalServicesFunctionParams,
  updateExternalServicesFunctionParams,
} from "../db/schema/externalServicesFunctions";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateExternalServicesFunctions = () =>
  revalidatePath("/external-services-functions");

export const createExternalServicesFunctionAction = async (
  input: NewExternalServicesFunctionParams,
) => {
  try {
    const payload = insertExternalServicesFunctionParams.parse(input);
    await createExternalServicesFunction(payload);
    revalidateExternalServicesFunctions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateExternalServicesFunctionAction = async (
  input: UpdateExternalServicesFunctionParams,
) => {
  try {
    const payload = updateExternalServicesFunctionParams.parse(input);
    await updateExternalServicesFunction(payload.id, payload);
    revalidateExternalServicesFunctions();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteExternalServicesFunctionAction = async (
  input: ExternalServicesFunctionId,
) => {
  try {
    const payload = externalServicesFunctionIdSchema.parse({ id: input });
    await deleteExternalServicesFunction(payload.id);
    revalidateExternalServicesFunctions();
  } catch (e) {
    return handleErrors(e);
  }
};
