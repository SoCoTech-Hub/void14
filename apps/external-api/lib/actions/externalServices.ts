"use server";

import { revalidatePath } from "next/cache";
import {
  createExternalService,
  deleteExternalService,
  updateExternalService,
} from "@/lib/api/externalServices/mutations";
import {
  ExternalServiceId,
  NewExternalServiceParams,
  UpdateExternalServiceParams,
  externalServiceIdSchema,
  insertExternalServiceParams,
  updateExternalServiceParams,
} from "@/lib/db/schema/externalServices";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateExternalServices = () => revalidatePath("/external-services");

export const createExternalServiceAction = async (input: NewExternalServiceParams) => {
  try {
    const payload = insertExternalServiceParams.parse(input);
    await createExternalService(payload);
    revalidateExternalServices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateExternalServiceAction = async (input: UpdateExternalServiceParams) => {
  try {
    const payload = updateExternalServiceParams.parse(input);
    await updateExternalService(payload.id, payload);
    revalidateExternalServices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteExternalServiceAction = async (input: ExternalServiceId) => {
  try {
    const payload = externalServiceIdSchema.parse({ id: input });
    await deleteExternalService(payload.id);
    revalidateExternalServices();
  } catch (e) {
    return handleErrors(e);
  }
};