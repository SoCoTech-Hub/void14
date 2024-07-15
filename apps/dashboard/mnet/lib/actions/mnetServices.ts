"use server";

import { revalidatePath } from "next/cache";
import {
  createMnetService,
  deleteMnetService,
  updateMnetService,
} from "@/lib/api/mnetServices/mutations";
import {
  MnetServiceId,
  NewMnetServiceParams,
  UpdateMnetServiceParams,
  mnetServiceIdSchema,
  insertMnetServiceParams,
  updateMnetServiceParams,
} from "@/lib/db/schema/mnetServices";

const handleErrors = (e: unknown) => {
  const errMsg = "Error, please try again.";
  if (e instanceof Error) return e.message.length > 0 ? e.message : errMsg;
  if (e && typeof e === "object" && "error" in e) {
    const errAsStr = e.error as string;
    return errAsStr.length > 0 ? errAsStr : errMsg;
  }
  return errMsg;
};

const revalidateMnetServices = () => revalidatePath("/mnet-services");

export const createMnetServiceAction = async (input: NewMnetServiceParams) => {
  try {
    const payload = insertMnetServiceParams.parse(input);
    await createMnetService(payload);
    revalidateMnetServices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const updateMnetServiceAction = async (input: UpdateMnetServiceParams) => {
  try {
    const payload = updateMnetServiceParams.parse(input);
    await updateMnetService(payload.id, payload);
    revalidateMnetServices();
  } catch (e) {
    return handleErrors(e);
  }
};

export const deleteMnetServiceAction = async (input: MnetServiceId) => {
  try {
    const payload = mnetServiceIdSchema.parse({ id: input });
    await deleteMnetService(payload.id);
    revalidateMnetServices();
  } catch (e) {
    return handleErrors(e);
  }
};
